<?php
include "config.php";

if (isset($_GET['action'])) {
    if ($_GET['action'] == 'getServices') {
        $sql = $conn->prepare("SELECT service_id, service_name FROM services");
        if ($sql->execute()) {
            $result = $sql->get_result();
            $data = [];

            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode([
                'status' => 'success',
                'message' => 'query successful',
                'data' => $data
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
    if ($_GET['action'] == 'getColors') {
        $sql = $conn->prepare("SELECT * FROM color");
        if ($sql->execute()) {
            $result = $sql->get_result();
            $data = [];

            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode([
                'status' => 'success',
                'message' => 'query successful',
                'data' => $data
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
    if ($_GET['action'] == 'getSizes') {
        $id = $_GET['id'];
        $sql = $conn->prepare("SELECT size_id, size, price FROM sizes WHERE service_id = ?");
        $sql->bind_param("i", $id);

        if ($sql->execute()) {
            $result = $sql->get_result();
            $data = [];

            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode([
                'status' => 'success',
                'message' => 'query successful',
                'data' => $data
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
    if ($_GET['action'] == 'getPaymentMethods') {
        $sql = $conn->prepare("SELECT * FROM payments");
        if ($sql->execute()) {
            $result = $sql->get_result();
            $data = [];

            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode([
                'status' => 'success',
                'message' => 'query successful',
                'data' => $data
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
    if ($_GET['action'] == 'getLocations') {
        $sql = $conn->prepare("SELECT * FROM addresses ORDER BY building ASC");

        if ($sql->execute()) {
            $result = $sql->get_result();
            $data = [];

            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }

            echo json_encode([
                'status' => 'successful',
                'message' => 'query successful',
                'data' => $data
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
    if ($_POST['action'] == 'store') {
        $payload = json_decode($_POST['payload']);

        $sql = $conn->prepare('INSERT INTO orders (account_id, address_id, delivery_option, total_price, payment_id, note) VALUES (?, ?, ?, ?, ?, ?)');
        $sql->bind_param('iisdis', $_SESSION['user'], $payload->address_id, $payload->delivery_option, $payload->total_price, $payload->payment_id, $payload->note);

        if ($sql->execute()) {
            $order_id = $conn->insert_id;

            foreach ($payload->items as $index => $item) {
                if (!isset($_FILES['file_' . $index])) {
                    continue; // skip missing files
                }
                $uploadDir = __DIR__ . "/../uploads/";
                $file = $_FILES['file_' . $index];
                $fileName = $_SESSION['user'] . "_" . time() . "_" . basename($file['name']);
                $targetFile = $uploadDir . $fileName; //para mapunta sa server ung file (server path)
                $webPath = "/uploads/" . $fileName; //para pag id-download na ng admin (webpath)

                move_uploaded_file($file['tmp_name'], $targetFile);
                $fileSql = $conn->prepare("INSERT INTO files (file_name, pages, file_path) VALUES (?, ?, ?)");
                $fileSql->bind_param("sis", $file['name'], $item->pageCount, $webPath);
                $fileSql->execute();

                $file_id = $conn->insert_id;

                $itemSql = $conn->prepare("INSERT INTO orderitems (order_id, file_id, service_id, copies, price) VALUES (?, ?, ?, ?, ?)");
                $itemSql->bind_param("iiiid", $order_id, $file_id, $item->service_id, $item->copies, $item->amount);
                $itemSql->execute();
            }

            echo json_encode([
                "status" => "success",
                "message" => "Order placed successfully"
            ]);
            exit;
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Order failed"
            ]);
        }
        exit;
    }
}
