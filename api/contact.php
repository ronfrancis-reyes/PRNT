<?php
include "config.php";

if (isset($_POST['action'])) {
    if ($_POST['action'] == 'store') {
        $payload = json_decode($_POST['payload']);

        $sql = $conn->prepare("INSERT INTO messages (name, email, subject, message, date_sent) VALUES (?, ?, ?, ?, current_timestamp())");
        $sql->bind_param("ssss", $payload->name, $payload->email, $payload->subject, $payload->message);

        if ($sql->execute()) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Message sent'
            ]);
            exit;
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'query failed'
            ]);
            exit;
        }
    }
}