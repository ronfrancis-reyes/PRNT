<?php
include "config.php";
if (isset($_POST['action'])) {
    if ($_POST['action'] == 'get') {
        $id = $_SESSION['user'];
        $sql = $conn->prepare("SELECT * FROM orders WHERE account_id = ?");
        $sql->bind_param('i', $id);
        if ($sql->execute()) {
            echo json_encode([
                'status' => 'success',
                'message' => 'query successful'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'query failed'
            ]);
        }
    }
}