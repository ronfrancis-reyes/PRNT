<?php
include "../config.php";
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

    if($_POST['action'] == 'drop') {
        $id = $_POST['id'];

        $sql = $conn->prepare("DELETE f FROM files f JOIN orderitems oi ON oi.file_id = f.file_id WHERE order_id = ?");
        $sql->bind_param("i", $id);
        $sql->execute();

        $sql = $conn->prepare("DELETE FROM orderitems WHERE order_id = ?");
        $sql->bind_param("i", $id);
        $sql->execute();

        $sql = $conn->prepare("DELETE FROM orders WHERE order_id = ?");
        $sql->bind_param("i", $id);
        $sql->execute();
        echo json_encode([
            "status" => "success",
            "message" => "Order deleted successfully"
        ]);
        exit;

    }
}