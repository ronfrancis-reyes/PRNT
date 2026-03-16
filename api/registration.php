<?php
include "config.php";
if ($_POST['action'] == "store") {
    $payload = json_decode($_POST['payload']);
    $hashedPassword = password_hash($payload->password, PASSWORD_DEFAULT);

    $sql = $conn->prepare("INSERT INTO accounts(name, email, contact_number, password, date_created) VALUES(?, ?, ?, ?, NOW())");
    $sql->bind_param("ssss", $payload->fullname, $payload->email, $payload->contact, $hashedPassword);

    if ($sql->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Account created successfully"]);
    } else {
        echo json_encode(["status" => "failed",
        "message" => "Failed to create account"]);
    }
    exit;
}