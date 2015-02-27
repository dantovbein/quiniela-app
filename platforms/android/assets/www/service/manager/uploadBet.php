<?php
	header('Access-Control-Allow-Origin: *');
	require_once "../Storage.php";

	if(isset($_POST['betNumber'])) { $betNumber = $_POST['betNumber']; }
	if(isset($_POST['betPosition'])) { $betPosition = $_POST['betPosition']; }
	if(isset($_POST['betAmount'])) { $betAmount = $_POST['betAmount']; }
	if(isset($_POST['betData'])) { $betData = $_POST['betData']; }
	if(isset($_POST['betTotalAmount'])) { $betTotalAmount = $_POST['betTotalAmount']; }
	if(isset($_POST['idDevice'])) { $idDevice = $_POST['idDevice']; }
	if(isset($_POST['idVendor'])) { $idVendor = $_POST['idVendor']; }
	if(isset($_POST['betCreated'])) { $betCreated = $_POST['betCreated']; }
	if(isset($_POST['betCanceled'])) { $betCanceled = $_POST['betCanceled']; }
	if(isset($_POST['isActive'])) { $isActive = $_POST['isActive']; }
	if(isset($_POST['betNumberRedoblona'])) { $betNumberRedoblona = $_POST['betNumberRedoblona']; }
	if(isset($_POST['betPositionRedoblona'])) { $betPositionRedoblona = $_POST['betPositionRedoblona']; }

	$data = array(
	    "betNumber" => $betNumber,
	    "betData" => $betData,
	    "betPosition" => $betPosition,
	    "betAmount" => $betAmount,
	    "betTotalAmount" => $betTotalAmount,
	    "idDevice" => $idDevice,
	    "idVendor" => $idVendor,
	    "betCreated" => $betCreated,
	    "betCanceled" => $betCanceled,
	    "isActive" => $isActive,
	    "betNumberRedoblona" => $betNumberRedoblona,
	    "betPositionRedoblona" => $betPositionRedoblona
	);

	$storage = new Storage();
	echo $storage->uploadBet($data);
?>

