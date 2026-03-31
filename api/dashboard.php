<?php
include "config.php";
if (isset($_POST['action'])) {
    if ($_POST['action'] == 'get') {
        $id = $_SESSION['account_id'];
        $sql = $conn->prepare("SELECT * FROM orders WHERE account_id = ?");
        $sql->bind_param('i', $id);
        if ($sql->execute()) {

        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'query failed'
            ]);
        }
    }
}