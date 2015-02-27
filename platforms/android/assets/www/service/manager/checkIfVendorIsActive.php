<?php
header('Access-Control-Allow-Origin: *');

require_once "../Storage.php";

if(isset($_POST['idVendor'])) { $idVendor = $_POST['idVendor']; }

$data = array(
    "idVendor" => $idVendor
);

$storage = new Storage();
echo $storage->checkIfVendorIsActive($data);
?>


