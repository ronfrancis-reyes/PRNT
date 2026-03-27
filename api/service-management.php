<?php
include "config.php";

if (isset($_POST['action'])) {
    if ($_POST['action'] == 'get') {
        $sql = $conn->prepare("SELECT * FROM services");
        $sql->execute();

        $result = $sql->get_result();
        $data = [];

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        if (empty($data)) {
            echo json_encode([
                "status" => "error",
                "message" => "no services found"
            ]);
        } else {
            echo json_encode($data);
        }

        exit;
    }

    if ($_POST['action'] == 'update') {
        $payload = json_decode($_POST['payload']);
        $id = $_POST['id'];

        $sql = $conn->prepare('UPDATE services SET service_name = ?, price = ? WHERE service_id = ? ');
        $sql->bind_param('sdi', $payload->service_name, $payload->price, $id );

        if ($sql->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Updated successfully",
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "query failed"
            ]);
        }
        exit;
    }

    if ($_POST['action'] == 'drop') {
        $id = $_POST['id'];
        $sql = $conn->prepare('DELETE FROM services WHERE service_id = ?');
        $sql->bind_param('i', $id);

        if ($sql->execute()) {
            echo json_encode([
                'status'=> 'success',
                'message'=> 'deleted successfully'
            ]);
        } else {
            echo json_encode([
                'status'=> 'error',
                'message'=> 'query failed'
            ]);
        }

        exit;
    }

    if ($_POST['action'] == 'store') {
        $payload = json_decode($_POST['payload']);

        $sql = $conn->prepare('INSERT INTO services(service_name, price) VALUES (?, ?)');
        $sql->bind_param('sd', $payload->service_name, $payload->price);

        if ($sql->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "service added successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "query failed"
            ]);
        }
    }
}