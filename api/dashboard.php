<?php
include "config.php";
if (isset($_POST['action'])) {
    if ($_POST['action'] == 'getOrders') {
        $id = $_SESSION['user'];
        $sql = $conn->prepare("SELECT order_id, date_placed, total_price, status FROM orders WHERE account_id = ?");
        $sql->bind_param('i', $id);
        if ($sql->execute()) {
            $result = $sql->get_result();
            $orders = [];
            while ($row = $result->fetch_assoc()) {
                $orders[] = $row;
            }
            echo json_encode([
                'status' => 'success',
                'message' => 'query successful',
                'orders' => $orders
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'query failed'
            ]);
        }
        exit;
    }
    if ($_POST['action'] == 'getItems') {
        $order_id = $_POST['order_id'];
        $sql = $conn->prepare("SELECT s.service_name, f.file_name, f.file_path FROM orderitems oi JOIN services s ON oi.service_id = s.service_id JOIN files f ON oi.file_id = f.file_id WHERE oi.order_id = ?");
        $sql->bind_param('i', $order_id);
        if ($sql->execute()) {
            $result = $sql->get_result();
            $items = [];
            while ($row = $result->fetch_assoc()) {
                $items[] = $row;
            }
            echo json_encode([
                'status' => 'success',
                'message' => 'query successful',
                'items' => $items
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'query failed'
            ]);
        }
        exit;
    }
}
