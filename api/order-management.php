<?php
include "config.php";
if (isset($_POST['action'])) {
    if($_POST['action'] == 'update') {
        $id = $_POST['id'];
        $status = $_POST['status'];

        $sql = $conn->prepare("UPDATE orders SET status = ? WHERE order_id = ?");
        $sql->bind_param("si", $status, $id);
        $sql->execute();

        echo json_encode([
            "status" => "success",
            "message" => "Order status updated successfully"
        ]);
        exit;
    }
}