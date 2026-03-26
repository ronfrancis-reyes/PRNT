<?php
include "config.php";
if (isset($_POST['action'])) {
    if ($_POST['action'] == 'get') {
        $sql = $conn->prepare("SELECT o.order_id, a.name, a.email, a.contact_number, o.time_placed, s.service_name, f.file_name, f.filepath, o.copies, o.delivery_option, o.note, o.format, o.address, o.total_price, o.status FROM orders o
JOIN accounts a
ON o.account_id = a.account_id
JOIN services s
ON o.service_id = s.service_id
JOIN files f
ON o.file_id = f.file_id");
        $sql->execute();

        $result = $sql->get_result();
        $data = [];

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        if (empty($data)) {
            echo json_encode([
                "status" => "error",
                "message" => "no orders found"
            ]); 
        } else {
            echo json_encode($data);
        }
    }
}