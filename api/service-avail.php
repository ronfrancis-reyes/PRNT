<?php
include "config.php";

if (isset($_GET['action'])) {
    if ($_GET['action'] == 'get') {
        $sql = $conn->prepare("SELECT service_name FROM services");
        $sql->execute();

        $result = $sql->get_result();

        $data = [];

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode($data);
    }
}