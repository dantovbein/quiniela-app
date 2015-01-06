<?php
header('Access-Control-Allow-Origin: *');

require_once "../Storage.php";

if(isset($_POST['user'])) { $user = $_POST['user']; }
if(isset($_POST['password'])) { $password = $_POST['password']; }

$data = array(
    "user" => $user,
    "password" => $password
);

$storage = new Storage();
echo $storage->login($data);
?>


