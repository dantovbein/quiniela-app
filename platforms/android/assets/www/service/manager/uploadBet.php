<?php
	header('Access-Control-Allow-Origin: *');
	require_once "../Storage.php";

	if(isset($_POST['betNumber'])) { $betNumber = $_POST['betNumber']; }
	if(isset($_POST['betData'])) { $betData = $_POST['betData']; }
	if(isset($_POST['betPosition'])) { $betPosition = $_POST['betPosition']; }
	if(isset($_POST['betAmount'])) { $betAmount = $_POST['betAmount']; }
	if(isset($_POST['betTotalAmount'])) { $betTotalAmount = $_POST['betTotalAmount']; }
	if(isset($_POST['idDevice'])) { $idDevice = $_POST['idDevice']; }
	if(isset($_POST['idVendor'])) { $idVendor = $_POST['idVendor']; }
	if(isset($_POST['betCreated'])) { $betCreated = $_POST['betCreated']; }
	if(isset($_POST['isActive'])) { $isActive = $_POST['isActive']; }

	
	//$betData = '{"data":{"bets":{"2":{"ID":2,"bet_number":"0019","bet_data":[{"lotteryTypeId":4,"lotteryType":"Nocturna","lotteryNameId":1,"lotteryName":"Nacional"}],"bet_position":"1","bet_amount":"454","total_amount":454,"date":"2015-01-05T23:42:35.921Z"}}}}';
	/*$betData = '{"data":{
      "bets":{
         "2":{
            "ID":2,
            "bet_number":"0019",
            "bet_data":[
               {
                  "lotteryTypeId":4,
                  "lotteryType":"Nocturna",
                  "lotteryNameId":1,
                  "lotteryName":"Nacional"
               },
               {
                  "lotteryTypeId":2,
                  "lotteryType":"Matutina",
                  "lotteryNameId":1,
                  "lotteryName":"Nacional"
               },
               {
                  "lotteryTypeId":2,
                  "lotteryType":"Vespertina",
                  "lotteryNameId":1,
                  "lotteryName":"Provincia"
               }
            ],
            "bet_position":"1",
            "bet_amount":"454",
            "total_amount":454,
            "date":"2015-01-05T23:42:35.921Z"
         }
      }
   }
}';*/
	
	/*$betData = '[{"lotteryTypeId":2,"lotteryType":"Matutina","lotteryNameId":3,"lotteryName":"Santa Fe"},{"lotteryTypeId":3,"lotteryType":"Vespertina","lotteryNameId":3,"lotteryName":"Santa Fe"},{"lotteryTypeId":4,"lotteryType":"Nocturna","lotteryNameId":3,"lotteryName":"Santa Fe"},{"lotteryTypeId":4,"lotteryType":"Nocturna","lotteryNameId":4,"lotteryName":"Tombola"}]';
	$betNumber = "0202";
	$betPosition = "10";
	$betAmount = "24";
	$betTotalAmount = "192.92";
	$idDevice = "1";
	$idVendor = "2";
	$betCreated = "Wed Feb 04 2015 20:41:41 GMT-0300 (ART)";*/
	//$betCanceled = "";


	$data = array(
	    "betNumber" => $betNumber,
	    "betData" => $betData,
	    "betPosition" => $betPosition,
	    "betAmount" => $betAmount,
	    "betTotalAmount" => $betTotalAmount,
	    "idDevice" => $idDevice,
	    "idVendor" => $idVendor,
	    "betCreated" => $betCreated,
	    "isActive" => $isActive//,
	    //"betCanceled" => $betCanceled
	);

	$storage = new Storage();
	echo $storage->uploadBet($data);
?>

