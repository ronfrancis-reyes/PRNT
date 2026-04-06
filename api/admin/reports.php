<?php
include "../config.php";

if (isset($_GET)) {
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