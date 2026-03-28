<?php
include "config.php";
if (isset($_POST['action'])) {
    if ($_POST['action'] == 'get') {
        $sql = $conn->prepare("SELECT a.account_id, a.name, a.email, a.account_status, o.order_id from accounts a
        LEFT JOIN orders o
        ON a.account_id = o.account_id
        AND o.time_placed = (
        SELECT MAX(time_placed)
        FROM orders
        WHERE account_id = a.account_id)
        WHERE a.account_id <> 1");
        $sql->execute();

        $result = $sql->get_result();
        $data = [];

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        if (empty($data)) {
            echo json_encode([
                "status" => "error",
                "message" => "no users found"
            ]); 
        } else {
            echo json_encode($data);
        }
        exit;
    }

    if($_POST['action'] == 'update') {
        $id = $_POST['id'];
        $status = $_POST['status'];

        $sql = $conn->prepare("UPDATE accounts SET account_status = ? WHERE account_id = ?");
        $sql->bind_param("si", $status, $id);
        $sql->execute();

        echo json_encode([
            "status" => "success",
            "message" => "Account status updated successfully"
        ]);
        exit;
    }
}