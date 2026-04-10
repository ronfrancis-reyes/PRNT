<?php
include "../config.php";

if (isset($_GET['action'])) {
    if ($_GET['action'] == 'get') {
        $sql = $conn->prepare("SELECT     *, DATE_FORMAT(date_sent, '%b %d, %Y') AS date, DATE_FORMAT(date_sent, '%h:%i %p') AS time FROM messages");
        
        if ($sql->execute()) {
            $result = $sql->get_result();
            $messages = [];
            while ($row = $result->fetch_assoc()) {
                $messages [] = $row;
            }
            
            echo json_encode([
                'status' => 'success',
                'message' => 'Messages retrieved',
                'messages' => $messages
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

if (isset($_POST['action'])) {
    if ($_POST['action'] == 'update') {
        $id = $_POST['id'];
        $status = $_POST['status'];

        $sql = $conn->prepare("UPDATE messages SET status = ? WHERE message_id = ?");
        $sql->bind_param("si", $status, $id);

        if ($sql->execute()) {
            echo json_encode([
                'status' => 'success',
                'message' => 'message updated to ' . $status
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

    if ($_POST['action'] == 'drop') {
        $id = $_POST['id'];

        $sql = $conn->prepare("DELETE FROM messages WHERE message_id = ?");
        $sql->bind_param("i", $id);

        if ($sql->execute()) {
            echo json_encode([
                'status' => 'success',
                'message' => 'message deleted'
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