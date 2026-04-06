<?php
include "../config.php";

if (isset($_POST['action'])) {
    if ($_POST['action'] == 'get') {
            $sql = $conn->prepare("SELECT * FROM services s LEFT JOIN sizes sz  ON s.service_id = sz.service_id");
        $sql->execute();
        $result = $sql->get_result();

        $services = [];

        while ($row = $result->fetch_assoc()) {

            $id = $row['service_id'];

            // if service not yet added
            if (!isset($services[$id])) {
                $services[$id] = [
                    "service_id" => $id,
                    "service_name" => $row['service_name'],
                    "available" => $row['available'],
                    "formats" => []
                ];
            }

            // add format if exists
            if ($row['size'] !== null) {
                $services[$id]['formats'][] = [
                    "size_id" => $row['size_id'],
                    "size" => $row['size'],
                    "price" => $row['price']
                ];
            }
        }

        $services = array_values($services);
        if (empty($services)) {
            echo json_encode([
                "status" => "error",
                "message" => "no services found"
            ]);
        } else {
            echo json_encode([
                'status' => 'success',
                'message' => 'services retrieved',
                'services' => $services
            ]);
        }

        exit;
    }

if ($_POST['action'] == 'update') {
    $serviceId = $_POST['id'] ?? null;
    $payload = json_decode($_POST['payload'] ?? '{}', true);

    $serviceName = $payload['service_name'] ?? '';
    $available = $payload['available'];
    $formats = $payload['formats'] ?? []; // array of {size, price, sizeId}
    $deletedFormats = $payload['removedFormatIds'];

    // 1. Update service table
    $stmt = $conn->prepare("UPDATE services SET service_name = ?, available = ? WHERE service_id = ?");
    $stmt->bind_param("ssi", $serviceName, $available, $serviceId);
    $stmt->execute();

    $formatResults = [];
    foreach ($formats as $format) {
        $size = $format['size'] ?? '';
        $price = $format['price'] ?? 0;
        $sizeId = $format['sizeId'];

        if (!empty($deletedFormats)) {
            foreach ($deletedFormats as $deletedFormat) {
                $stmt = $conn->prepare("DELETE FROM sizes WHERE size_id = ?");
                $stmt->bind_param("i", $deletedFormat);
                $stmt->execute();
            }
        }   
        if ($sizeId != 0) {
            // Existing format: update it
            $stmt = $conn->prepare("UPDATE sizes SET size = ?, price = ? WHERE size_id = ?");
            $stmt->bind_param("sdi", $size, $price, $sizeId);
            $stmt->execute();
        } else {
            // New format: insert it
            $stmt = $conn->prepare("INSERT INTO sizes (service_id, size, price) VALUES (?, ?, ?)");
            $stmt->bind_param("isd", $serviceId, $size, $price);
            $stmt->execute();
        }
            $stmt->close();
    }
        echo json_encode([
            'status' => 'success',
            'message' => 'Service updated successfully',
        ]);
    exit;
    // Final debug response

}

    if ($_POST['action'] == 'drop') {
        $id = $_POST['id'];
        $sql = $conn->prepare('DELETE FROM sizes WHERE service_id = ?');
        $sql->bind_param('i', $id);
        $sql->execute();

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
        $payload = json_decode($_POST['payload'], true);

        $service_name = $payload['service_name'];
        $available = $payload['available'];
        $formats = $payload['formats'];

        // insert service
        $stmt = $conn->prepare('INSERT INTO services(service_name, available) VALUES (?, ?)');
        $stmt->bind_param('ss', $service_name, $available);

        if ($stmt->execute()) {
            $service_id = $stmt->insert_id;

            foreach ($formats as $format) {
                $size = $format['format']; // match your JS
                $price = $format['price'];

                $stmt2 = $conn->prepare("INSERT INTO sizes (service_id, size, price) VALUES (?, ?, ?)");
                $stmt2->bind_param("isd", $service_id, $size, $price);
                $stmt2->execute();
            }

            echo json_encode([
                "status" => "success",
                "message" => "service added successfully",
                "service_id" => $service_id
            ]);

        } else {
            echo json_encode([
                "status" => "error",
                "message" => $stmt->error
            ]);
        }

        exit;
    }

    if ($_POST['action'] == 'updateStatus') {
        $serviceId = $_POST['id'] ?? null;
        $available = $_POST['available'];

        $stmt = $conn->prepare("UPDATE services SET available = ? WHERE service_id = ?");
        $stmt->bind_param("si", $available, $serviceId);

        if ($stmt->execute()) {
            echo json_encode([
                "status" => "success",
                "available" => $available
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => $stmt->error
            ]);
        }

        exit;
    }
}