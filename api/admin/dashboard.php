<?php
include "../config.php";

if (isset($_GET['action'])) {
    if ($_GET['action'] == 'getOrdersCount') {
        $sql = $conn->prepare("SELECT
                                    SUM(CASE WHEN date_placed >= CURDATE() AND date_placed < CURDATE() + INTERVAL 1 DAY THEN 1 ELSE 0 END) AS total_orders_today,
                                    SUM(CASE WHEN date_placed >= CURDATE() - INTERVAL 1 DAY AND date_placed < CURDATE() THEN 1 ELSE 0 END) AS total_orders_yesterday
                                FROM orders;");
        if ($sql->execute()) {
            $result = $sql->get_result();
            $total_order = $result->fetch_assoc();

            $sql = $conn->prepare("SELECT
                                        SUM(CASE WHEN date_placed >= CURDATE() AND date_placed < CURDATE() + INTERVAL 1 DAY
                                                AND status = 'Completed' THEN total_price ELSE 0 END) AS total_revenue_today,
                                        SUM(CASE WHEN date_placed >= CURDATE() - INTERVAL 1 DAY AND date_placed < CURDATE()
                                                AND status = 'Completed' THEN total_price ELSE 0 END) AS total_revenue_yesterday
                                    FROM orders;");
            $sql->execute();
            $result = $sql->get_result();
            $total_revenue = $result->fetch_assoc();

            $sql = $conn->prepare("SELECT COUNT(status) AS pending_orders FROM orders WHERE status = 'Printing'");
            $sql->execute();
            $result = $sql->get_result();
            $pending_orders = $result->fetch_assoc();
        
            echo json_encode([
                'status' => 'success',
                'message' => 'today order count retrieved',
                'totalOrdersToday' => $total_order['total_orders_today'],
                'totalOrdersYesterday' => $total_order['total_orders_yesterday'],
                'totalRevenueToday' => $total_revenue['total_revenue_today'],
                'totalRevenueYesterday' => $total_revenue['total_revenue_yesterday'],
                'pendingOrders' => $pending_orders['pending_orders']
            ]);
            exit;
        } else {
            echo json_encode([
                'status' => 'failed',
                'message' => 'query failed',
            ]);
            exit;
        }
    }

    if ($_GET['action'] == 'getServices') {
        $sql = $conn->prepare("SELECT s.service_name, COUNT(o.order_id) AS orderCount FROM services s LEFT JOIN orderitems oi  ON s.service_id = oi.service_id LEFT JOIN orders o 
                    ON o.order_id = oi.order_id
                    AND o.date_placed >= CURDATE()
                    AND o.date_placed < CURDATE() + INTERVAL 1 DAY
                GROUP BY s.service_name;");
        
        if ($sql->execute()) {
            $result = $sql->get_result();
            $data = [];

            while ($row = $result->fetch_assoc()) {
                $data [] = $row;
            }

            echo json_encode([
                'status' => 'success',
                'message' => 'order count by service retrieved',
                'data' => $data
            ]);
            exit;
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'query failed',
            ]);
            exit;
        }

    }

    if($_GET['action'] == 'getToReviewOrdersCount') {
        $sql = $conn->prepare("SELECT COUNT(*) AS orders_to_review FROM orders WHERE status = 'Reviewing'");
        if ($sql->execute()) {
            $result = $sql->get_result();
            $orders_to_review = $result->fetch_assoc();

            echo json_encode([
                'status' => 'success',
                'message' => 'orders to review count retrieved',
                'ordersToReview' => $orders_to_review['orders_to_review']
            ]);
            exit;
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'query failed',
            ]);
            exit;
        }
    }

    if($_GET['action'] == 'getTotalActiveUsers') {
        $sql = $conn->prepare("SELECT COUNT(*) AS active_users FROM accounts WHERE role='Customer' AND status='Active'");
        if ($sql->execute()) {
            $result = $sql->get_result();
            $active_users = $result->fetch_assoc();

            echo json_encode([
                'status' => 'success',
                'message' => 'active users count retrieved',
                'activeUsers' => $active_users['active_users']
            ]);
            exit;
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'query failed',
            ]);
            exit;
        }
    }

    if($_GET['action'] == 'getCompletedOrdersCount') {
        $sql = $conn->prepare("SELECT COUNT(*) AS total_completed_orders
                                FROM (
                                    SELECT order_id FROM orders WHERE status = 'Completed'
                                    UNION ALL
                                    SELECT order_id FROM orders_archive WHERE status = 'Completed'
                                ) AS combined;");
        if ($sql->execute()) {
            $result = $sql->get_result();
            $completed_orders = $result->fetch_assoc();

            echo json_encode([
                'status' => 'success',
                'message' => 'completed orders count retrieved',
                'completedOrders' => $completed_orders['total_completed_orders']
            ]);
            exit;
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'query failed',
            ]);
            exit;
        }
    }
}