<?php
header('Access-Control-Allow-Origin: *');

require_once "../Storage.php";

if(isset($_POST['user'])) { $user = $_POST['user']; }
if(isset($_POST['unlockAppCode'])) { $unlockAppCode = $_POST['unlockAppCode']; }

$data = array(
    "user" => $user,
    "unlockAppCode" => $unlockAppCode
);

$storage = new Storage();
echo $storage->unlock($data);
?>


