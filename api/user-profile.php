<?php
include "config.php";

if (isset($_POST['action'])) {
    if ($_POST['action'] == 'logout') {
        unset($_SESSION['user']);
        unset($_SESSION['email']);
        unset($_SESSION['username']);
        unset($_SESSION['contact_number']);
        unset($_SESSION['date_created']);
        unset($_SESSION['role']);
        session_destroy();
        exit;
    }

    if ($_POST['action'] == "updateUserInfo") {
        $payload = json_decode($_POST['payload']);

        if ($_SESSION['role'] == 'Customer') {
            $sql = $conn->prepare('UPDATE accounts SET name = ?, contact_number = ? WHERE account_id = ?');
            $sql->bind_param("ssi", $payload->name, $payload->contact_number, $_SESSION['user']);
        } else {
            $sql = $conn->prepare('UPDATE accounts SET name = ?, email = ?, contact_number = ? WHERE account_id = ?');
            $sql->bind_param("sssi", $payload->name, $payload->email, $payload->contact_number, $_SESSION['user']);
        }

        if ($sql->execute()) {
            $_SESSION['username'] = $payload->name;
            echo json_encode([
                'status' => 'success',
                'message' => 'Personal information updated successfully'
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
        if ($_POST['action'] == "updatePassword") {
        $payload = json_decode($_POST['payload']);
        $currentPass = $payload->currentPass;
        $newPass = password_hash($payload->newPass, PASSWORD_DEFAULT);

        $sql = $conn->prepare('SELECT password FROM accounts WHERE account_id = ?');
        $sql->bind_param("i", $_SESSION['user']);
        $sql->execute();
        $result = $sql->get_result();

        $row = $result->fetch_assoc();
        $password = $row['password'];

        if (password_verify($currentPass, $password)) {
            $sql = $conn->prepare('UPDATE accounts SET password = ? WHERE account_id = ?');
            $sql->bind_param("si", $newPass, $_SESSION['user']);

            if ($sql->execute()) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Your password has been changed.'
                ]);
                exit;
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'query failed'
                ]);
                exit;
            }
        } else {
            echo json_encode([
                    'status' => 'failed',
                    'message' => 'Incorrect password'
            ]);
            exit;
        }

    }
}