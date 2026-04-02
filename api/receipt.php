<?php
include "config.php";

if (isset($_GET)) {
    if ($_GET['action'] == 'getId') {
        echo json_encode($_SESSION['receiptToShow']);
        exit;
    }

    if ($_GET['action'] == 'getOrder') {
        $id = $_GET['id'];

        $sql = $conn->prepare('SELECT o.order_id, a.name, a.contact_number, o.date_placed, ad.building, o.status, o.delivery_option, o.total_price, p.payment_type, o.note FROM orders o JOIN accounts a ON o.account_id = a.account_id JOIN addresses ad ON o.address_id = ad.address_id JOIN payments p ON o.payment_id = p.payment_id WHERE o.order_id = ?;');
        $sql->bind_param("i", $id);

        if ($sql->execute()) {
            $result = $sql->get_result();
            $details[]= $result->fetch_assoc();

            $itemSql = $conn->prepare("SELECT * FROM orderitems oi JOIN services s ON oi.service_id = s.service_id JOIN files f ON oi.file_id = f.file_id JOIN color c ON oi.color_id = c.color_id WHERE oi.order_id = ?");
            $itemSql->bind_param('i', $id);

            $items = [];
            if ($itemSql->execute()) {
                $itemResult = $itemSql->get_result();
                while ($row = $itemResult->fetch_assoc()) {
                    $items[] = $row;
                }
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'item sql failed'
                ]);
            }
            echo json_encode([
                'status' => 'successful',
                'message' => 'successful',
                'orderDetails' => $details,
                'orderItems' => $items
            ]);
            exit;
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'query failed'
            ]);
            exit;
        }
    }
}