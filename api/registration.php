<?php
include "config.php";

if(isset($_POST['action'])) {
    if ($_POST['action'] == "postOne") {
    $id = $_POST['email'];

    $sql = $conn->prepare("SELECT email from accounts WHERE email = ?");
    $sql->bind_param("s", $id);

    $sql->execute();
    $result = $sql->get_result();

    if($result->num_rows == 0) {
        echo json_encode([
            "status" => "success",
            "message" => "Account is new"
        ]);
    } else {
        echo json_encode([
            "status" => "failed",
            "message" => "Account already exist"
        ]);
    }
    exit;
}

    if ($_POST['action'] == "store") {
        $payload = json_decode($_POST['payload']);
        $hashedPassword = password_hash($payload->password, PASSWORD_DEFAULT);

        $sql = $conn->prepare("INSERT INTO accounts (name, email, contact_number, password, status, role, date_created) VALUES(?, ?, ?, ?, 'Active', 'Customer', current_timestamp())");
        $sql->bind_param("ssss", $payload->fullname, $payload->email, $payload->contact, $hashedPassword);

        if ($sql->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Account created successfully"]);
        } else {
            echo json_encode([
                "status" => "failed",
                "message" => "Failed to create account"]);
        }
        exit;
    }
}
