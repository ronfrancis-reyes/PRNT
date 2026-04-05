<?php
include "../config.php";
if (isset($_POST['action'])) {
    if ($_POST['action'] == 'getUsers') {
        $sql = $conn->prepare("SELECT 
                                a.account_id,
                                a.contact_number,
                                a.name,
                                a.email,
                                a.status,
                                COALESCE((
                                    SELECT f.file_name
                                    FROM orderitems oi
                                    JOIN files f ON f.file_id = oi.file_id
                                    WHERE oi.order_id = (
                                        SELECT o.order_id
                                        FROM orders o
                                        WHERE o.account_id = a.account_id
                                        ORDER BY o.date_placed DESC
                                        LIMIT 1
                                    )
                                    LIMIT 1
                                ), 'No orders yet') AS latest_order,
                                COALESCE((
                                    SELECT MAX(o2.date_placed)
                                    FROM orders o2
                                    WHERE o2.account_id = a.account_id
                                ), 'No orders yet') AS last_order_date,
                                (
                                    SELECT COUNT(*)
                                    FROM orders o3
                                    WHERE o3.account_id = a.account_id
                                ) AS total_orders
                            FROM accounts a
                            WHERE a.role = 'Customer';");
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
            exit;
        } else {
            echo json_encode([
                "status" => 'success',
                'message' => 'Users retrieved',
                'users' => $data
            ]);
        }
        exit;
    }

    if($_POST['action'] == 'update') {
        $id = $_POST['id'];
        $status = $_POST['status'];

        $sql = $conn->prepare("UPDATE accounts SET status = ? WHERE account_id = ?");
        $sql->bind_param("si", $status, $id);
        $sql->execute();

        echo json_encode([
            "status" => "success",
            "message" => "Account status updated successfully"
        ]);
        exit;
    }
        if($_POST['action'] == 'drop') {
            $id = $_POST['id'];

            $sql = $conn->prepare("DELETE FROM accounts WHERE account_id = ?");
            $sql->bind_param("i", $id);
            $sql->execute();

            echo json_encode([
                "status" => "success",
                "message" => "Account status updated successfully"
            ]);
        exit;
    }
}