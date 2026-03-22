<?php
include "config.php";

if (isset($_GET['action'])) {
    if ($_GET['action'] == 'get') {
        $sql = $conn->prepare("SELECT service_id, service_name FROM services");
        $sql->execute();

        $result = $sql->get_result();

        $data = [];

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode($data);
        exit;
    }

    if ($_GET["action"] == "getOne") {
        $sql = $conn->prepare("SELECT price FROM services WHERE service_id = ?");
        $sql->bind_param("i", $_GET['id']);
        $sql->execute();

        $result = $sql->get_result();
        $data = $result->fetch_assoc();

        echo json_encode($data);
        exit;
    }
}

if (isset($_POST['action'])) {
    if ($_POST['action'] == 'store') {
        $payload = json_decode($_POST['payload']);
        $sql = $conn->prepare('INSERT INTO orders (account_id, service_id, file_id, time_placed, format, delivery_option, address, copies, note, total_price) VALUES (?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?)');
        $sql->bind_param("iiisssisd", $_SESSION['user'], $payload->service_id, $payload->file_id, $payload->format, $payload->deliveryOption, $payload->deliveryAddress, $payload->copies, $payload->note, $payload->total_price);

        if ($sql->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Order placed successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "failed"
            ]);
        }
        exit;
    }
}

$uploadDir = __DIR__ . "/../uploads/";

if(isset($_FILES['file'])){
    $file = $_FILES['file'];
    $filename = $_SESSION['user'] . "_" . time() . "_" . basename($file['name']); // avoid collisions
    $targetFile = $uploadDir . $filename;

    if(move_uploaded_file($file['tmp_name'], $targetFile)){
        $sql = $conn->prepare("INSERT INTO files (file_name, pages, filepath) VALUES (?, ?, ?)");
        $sql->bind_param("sis", $file['name'], $_POST['pageCount'], $targetFile);
        $sql->execute();

        $file_id = $conn->insert_id;

        echo json_encode([
            "status" => "success",
            "path" => $targetFile,
            "file_id" => $file_id
        ]);
        exit;
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to move uploaded file."
        ]);
        exit;
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "No file uploaded."
    ]);
    exit;
}


