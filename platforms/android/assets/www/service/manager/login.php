<?php
header('Access-Control-Allow-Origin: *');

require_once "../Storage.php";

if(isset($_POST['user'])) { $user = $_POST['user']; }
if(isset($_POST['password'])) { $password = $_POST['password']; }
//if(isset($_GET['user'])) { $user = $_GET['user']; }
//if(isset($_GET['password'])) { $password = $_GET['password']; }


$data = array(
    "user" => $user,
    "password" => $password
);

$storage = new Storage();
echo $storage->login($data);
?>


