<?php
header('Access-Control-Allow-Origin: *');

require_once "../Storage.php";

if(isset($_POST['user'])) { $user = $_POST['user']; }
if(isset($_POST['unlockCode'])) { $unlockCode = $_POST['unlockCode']; }

$data = array(
    "user" => $user,
    "unlockCode" => $unlockCode
);

$storage = new Storage();
echo $storage->unlock($data);
?>


