<?php
include "../config.php";

if (isset($_GET['action'])) {
    if ($_GET['action'] == 'getDataDaily') {
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

            $sql = $conn->prepare("SELECT
                    COUNT(CASE WHEN DATE(date_created) = CURDATE() THEN 1 END) AS total_customer_today,
                    COUNT(CASE WHEN DATE(date_created) = CURDATE() - INTERVAL 1 DAY THEN 1 END) AS total_customer_yesterday
                FROM accounts
                WHERE role = 'Customer'
            ");
            $sql->execute();
            $result = $sql->get_result();
            $total_customer = $result->fetch_assoc();

            $sql = $conn->prepare("SELECT s.service_name, COUNT(o.order_id) AS orderCount, SUM(price) AS revenue FROM services s LEFT JOIN orderitems oi  ON s.service_id = oi.service_id LEFT JOIN orders o 
                    ON o.order_id = oi.order_id
                    AND o.date_placed >= CURDATE()
                    AND o.date_placed < CURDATE() + INTERVAL 1 DAY
                GROUP BY s.service_name;");
            $sql->execute();
            $result = $sql->get_result();
            $services = [];

            while ($row = $result->fetch_assoc()) {
                $services [] = $row;
            }

            $sql = $conn->prepare("SELECT 
                                s.service_id,
                                s.service_name,
                                sz.size,
                                COUNT(oi.item_id) AS order_count,
                                SUM(oi.price) AS total_revenue
                            FROM services s
                            LEFT JOIN sizes sz ON s.service_id = sz.service_id
                            LEFT JOIN orderitems oi ON oi.service_id = s.service_id
                            LEFT JOIN orders o ON oi.order_id = o.order_id
                            WHERE o.date_placed >= CURDATE()
                            AND o.date_placed < CURDATE() + INTERVAL 1 DAY
                            GROUP BY s.service_name, sz.size
                            ORDER BY order_count DESC
                            LIMIT 4;");
            $sql->execute();
            $result = $sql->get_result();
            $top_performing = [];

            while ($row = $result->fetch_assoc()) {
                $top_performing[] = $row;
            }

            $data = [
                'totalOrdersToday' => $total_order['total_orders_today'],
                'totalOrdersYesterday' => $total_order['total_orders_yesterday'],

                'totalRevenueToday' => $total_revenue['total_revenue_today'],
                'totalRevenueYesterday' => $total_revenue['total_revenue_yesterday'],

                'totalCustomerToday' => $total_customer['total_customer_today'],
                'totalCustomerYesterday' => $total_customer['total_customer_yesterday']

            ];
        
            echo json_encode([
                'status' => 'success',
                'message' => 'today order count retrieved',
                'data' => $data,
                'services' => $services,
                'topPerforming' => $top_performing
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

    if ($_GET['action'] == 'getDataMonthly') {
        $sql = $conn->prepare("SELECT
                COALESCE(SUM(CASE 
                    WHEN YEAR(date_placed)=YEAR(CURDATE()) 
                    AND MONTH(date_placed)=MONTH(CURDATE()) 
                THEN 1 ELSE 0 END), 0) AS total_orders_month,

                COALESCE(SUM(CASE 
                    WHEN YEAR(date_placed)=YEAR(CURDATE() - INTERVAL 1 MONTH)
                    AND MONTH(date_placed)=MONTH(CURDATE() - INTERVAL 1 MONTH)
                THEN 1 ELSE 0 END), 0) AS total_orders_last_month
            FROM orders
        ");
        if ($sql->execute()) {
            $total_order = $sql->get_result()->fetch_assoc();
            $sql = $conn->prepare(" SELECT
                    COALESCE(SUM(CASE 
                        WHEN YEAR(date_placed)=YEAR(CURDATE()) 
                        AND MONTH(date_placed)=MONTH(CURDATE())
                        AND status='Completed'
                    THEN total_price ELSE 0 END), 0) AS total_revenue_month,

                    COALESCE(SUM(CASE 
                        WHEN YEAR(date_placed)=YEAR(CURDATE() - INTERVAL 1 MONTH)
                        AND MONTH(date_placed)=MONTH(CURDATE() - INTERVAL 1 MONTH)
                        AND status='Completed'
                    THEN total_price ELSE 0 END), 0) AS total_revenue_last_month
                FROM orders
            ");

            $sql->execute();
            $total_revenue = $sql->get_result()->fetch_assoc();

            $sql = $conn->prepare("SELECT
                    COALESCE(SUM(CASE 
                        WHEN YEAR(date_created) = YEAR(CURDATE()) 
                        AND MONTH(date_created) = MONTH(CURDATE()) THEN 1 ELSE 0 END), 0) AS total_customer_month,

                    COALESCE(SUM(CASE 
                        WHEN YEAR(date_created) = YEAR(CURDATE()) 
                        AND MONTH(date_created) = MONTH(CURDATE()) - 1 THEN 1 ELSE 0 END), 0) AS total_customer_last_month
                FROM accounts
                WHERE role = 'Customer'
            ");
            $sql->execute();
            $total_customer = $sql->get_result()->fetch_assoc();

            $sql = $conn->prepare(" SELECT s.service_name, 
                    COUNT(o.order_id) AS orderCount, 
                    SUM(price) AS revenue 
                FROM services s 
                LEFT JOIN orderitems oi ON s.service_id = oi.service_id 
                LEFT JOIN orders o ON o.order_id = oi.order_id
                    AND YEAR(o.date_placed) = YEAR(CURDATE())
                    AND MONTH(o.date_placed) = MONTH(CURDATE())
                GROUP BY s.service_name
            ");
            $sql->execute();
            $result = $sql->get_result();
            $services_month = [];
            while ($row = $result->fetch_assoc()) {
                $services [] = $row;
            }

            $sql = $conn->prepare(" SELECT 
                    s.service_id,
                    s.service_name,
                    sz.size,
                    COUNT(oi.item_id) AS order_count,
                    SUM(oi.price) AS total_revenue
                FROM services s
                LEFT JOIN sizes sz ON s.service_id = sz.service_id
                LEFT JOIN orderitems oi ON oi.service_id = s.service_id
                LEFT JOIN orders o ON oi.order_id = o.order_id
                WHERE YEAR(o.date_placed) = YEAR(CURDATE())
                AND MONTH(o.date_placed) = MONTH(CURDATE())
                GROUP BY s.service_name, sz.size
                ORDER BY order_count DESC
                LIMIT 4;
            ");

            $sql->execute();
            $result = $sql->get_result();
            $top_performing = [];

            while ($row = $result->fetch_assoc()) {
                $top_performing[] = $row;
            }

            $data = [
                'totalOrdersMonth' => $total_order['total_orders_month'],
                'totalOrdersLastMonth' => $total_order['total_orders_last_month'],

                'totalRevenueMonth' => $total_revenue['total_revenue_month'],
                'totalRevenueLastMonth' => $total_revenue['total_revenue_last_month'],

                'totalCustomerMonth' => $total_customer['total_customer_month'],
                'totalCustomerLastMonth' => $total_customer['total_customer_last_month']
            ];
        
            echo json_encode([
                'status' => 'success',
                'message' => 'monthly order count retrieved',
                'data' => $data,
                'services' => $services,
                'topPerforming' => $top_performing

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

    if ($_GET['action'] == 'getDataYearly') {
        $sql = $conn->prepare("SELECT
            COALESCE(SUM(CASE 
                WHEN YEAR(date_placed) = YEAR(CURDATE()) 
            THEN 1 ELSE 0 END), 0) AS total_orders_year,

            COALESCE(SUM(CASE 
                WHEN YEAR(date_placed) = YEAR(CURDATE()) - 1 
            THEN 1 ELSE 0 END), 0) AS total_orders_last_year
        FROM orders
        ");

            if ($sql->execute()) {
                $total_order = $sql->get_result()->fetch_assoc();

                $sql = $conn->prepare("SELECT
                        COALESCE(SUM(CASE 
                            WHEN YEAR(date_placed) = YEAR(CURDATE())
                            AND status = 'Completed'
                        THEN total_price ELSE 0 END), 0) AS total_revenue_year,

                        COALESCE(SUM(CASE 
                            WHEN YEAR(date_placed) = YEAR(CURDATE()) - 1
                            AND status = 'Completed'
                        THEN total_price ELSE 0 END), 0) AS total_revenue_last_year
                    FROM orders
                ");
            $sql->execute();
            $total_revenue = $sql->get_result()->fetch_assoc();

            $sql = $conn->prepare("SELECT
                    COALESCE(SUM(CASE 
                        WHEN YEAR(date_created) = YEAR(CURDATE()) 
                        THEN 1 ELSE 0 END), 0) AS total_customer_year,

                    COALESCE(SUM(CASE 
                        WHEN YEAR(date_created) = YEAR(CURDATE()) - 1 
                        THEN 1 ELSE 0 END), 0) AS total_customer_last_year
                FROM accounts
                WHERE role = 'Customer'
            ");
            $sql->execute();
            $total_customer = $sql->get_result()->fetch_assoc();

            $sql = $conn->prepare(" SELECT s.service_name, 
                    COUNT(o.order_id) AS orderCount, 
                    SUM(price) AS revenue 
                FROM services s 
                LEFT JOIN orderitems oi ON s.service_id = oi.service_id 
                LEFT JOIN orders o ON o.order_id = oi.order_id
                    AND YEAR(o.date_placed) = YEAR(CURDATE())
                GROUP BY s.service_name
            ");
            $sql->execute();
            $result = $sql->get_result();
            $services_year = [];
            while ($row = $result->fetch_assoc()) {
                $services [] = $row;
            }

            $sql = $conn->prepare(" SELECT 
                        s.service_id,
                        s.service_name,
                        sz.size,
                        COUNT(oi.item_id) AS order_count,
                        SUM(oi.price) AS total_revenue
                    FROM services s
                    LEFT JOIN sizes sz ON s.service_id = sz.service_id
                    LEFT JOIN orderitems oi ON oi.service_id = s.service_id
                    LEFT JOIN orders o ON oi.order_id = o.order_id
                    WHERE YEAR(o.date_placed) = YEAR(CURDATE())
                    GROUP BY s.service_name, sz.size
                    ORDER BY order_count DESC
                    LIMIT 4;
                ");

                $sql->execute();
                $result = $sql->get_result();
                $top_performing = [];

            while ($row = $result->fetch_assoc()) {
                $top_performing[] = $row;
            }

            $data = [
                'totalOrdersYear' => $total_order['total_orders_year'],
                'totalOrdersLastYear' => $total_order['total_orders_last_year'],

                'totalRevenueYear' => $total_revenue['total_revenue_year'],
                'totalRevenueLastYear' => $total_revenue['total_revenue_last_year'],

                'totalCustomerYear' => $total_customer['total_customer_year'],
                'totalCustomerLastYear' => $total_customer['total_customer_last_year']

            ];
        
            echo json_encode([
                'status' => 'success',
                'message' => 'year order count retrieved',
                'data' => $data,
                'services' => $services,
                'topPerforming' => $top_performing

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
}