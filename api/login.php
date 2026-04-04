<?php
include "config.php";

if(isset($_POST['action'])){
    if($_POST['action']== "postOne"){
        $payload = json_decode($_POST['payload']);

        $sql = $conn->prepare("SELECT * FROM accounts WHERE email = ?");
        $sql->bind_param("s", $payload->email);
        $sql->execute();

        $result = $sql->get_result();
        if($result->num_rows > 0){
            $account = $result->fetch_assoc();
            if(password_verify($payload->password, $account['password'])){
                $_SESSION['user'] = $account['account_id'];
                $_SESSION['email'] = $account['email'];
                $_SESSION['username'] = $account['name'];
                $_SESSION['role'] = $account['role'];
                echo json_encode([
                    "status" => "success",
                    "message" => "Logged In!"
                ]);
            }else{
                echo json_encode([
                    "status"=> "error",
                    "message"=> "Incorrect password!"
                ]);
            }
        }else{
            echo json_encode([
                "status"=> "error",
                "message"=> "Account does not exist!"
            ]);
        }
    }
}