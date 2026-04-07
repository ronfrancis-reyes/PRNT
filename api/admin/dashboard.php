<?php
include "../config.php";

if (isset($_GET['action'])) {
    if ($_GET['action'] == 'getOrdersCount') {
        $sql = $conn->prepare("SELECT COUNT(*) AS total_orders FROM orders WHERE date_placed >= CURDATE() AND date_placed < CURDATE() + INTERVAL 1 DAY");
        if ($sql->execute()) {
            $result = $sql->get_result();
            $total_order = $result->fetch_assoc();

            $sql = $conn->prepare("SELECT SUM(total_price) AS total_revenue FROM orders WHERE date_placed >= CURDATE() AND date_placed < CURDATE() + INTERVAL 1 DAY AND status = 'Completed'");
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
                'totalOrders' => $total_order['total_orders'],
                'totalRevenue' => $total_revenue['total_revenue'],
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
}