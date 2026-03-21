<?php
include "config.php";

unset($_SESSION["user"]);
session_destroy();
header("Location: ../pages/login/");