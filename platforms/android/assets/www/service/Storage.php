<?php
class Storage {
	
	public $host = "";	
	public $server = "";
	public $password = "";
	public $dataBase = "";
	private $sql;

	public function Storage() {
		$debug = !true;
		if($debug) {
			$this->host = "localhost";	
			$this->server = "root";
			$this->password = "";
			$this->dataBase = "quiniela";
		} else {
			$this->host = "192.186.248.103";	
			$this->server = "yoviajoriveras";
			$this->password = "Lucho1974";
			$this->dataBase = "quiniela";
		}
	}

	private function connect() {
		$this->sql = mysql_connect($this->host , $this->server , $this->password) or die ('Error al conectarse a sql');
		mysql_select_db($this->dataBase) or die ("Error al conectarse a la Base de Datos");
	}

	private function close() {
		mysql_close($this->sql);
	}
	
	public function login($data) {
		$this->connect();

		$user = $data['user'];
		$password = $data['password'];

		$query = 'SELECT * FROM vendors WHERE vendor_user_name="' . $user . '" AND vendor_password="' . $password . '"';
		
		$result = mysql_query($query);
		$row = mysql_fetch_assoc($result);

		$dataQuery = array();
		$obj->idVendor = $row['id_vendor'];
		$obj->idDevice = $row['id_device'];
		$obj->user = $row['vendor_user_name'];
		$obj->password = $row['vendor_password'];
		$obj->fullName = $row['vendor_full_name'];
		$obj->unlockAppCode = $row['vendor_unlock_app_code'];
		$obj->unlockCode = $row['vendor_unlock_code'];
		array_push($dataQuery, $obj);
		
		echo json_encode($dataQuery);
		$this->close();	
	}

	public function unlock($data) {
		$this->connect();

		$query = 'SELECT * FROM vendors WHERE id_vendor="' . $data['user'] . '" AND vendor_unlock_app_code="' . $data['unlockAppCode'] . '"';
		
		$result = mysql_query($query);
		$row = mysql_fetch_assoc($result);

		$dataQuery = array();
		$obj->idVendor = $row['id_vendor'];
		array_push($dataQuery, $obj);
		
		echo json_encode($dataQuery);
		$this->close();	
	}


	public function uploadBet($data) {
		$this->connect();		
		$query =  'INSERT INTO bets (bet_number,bet_position,id_device,id_vendor,bet_amount,bet_total_amount,bet_time_created,bet_time_canceled,bet_is_active,bet_number_redoblona,bet_position_redoblona) VALUES (' . "'" . $data['betNumber'] . "','" . $data['betPosition'] . "','" . $data['idDevice'] . "','" . $data['idVendor'] . "','" . $data['betAmount'] . "','" . $data['betTotalAmount'] . "','" . $data['betCreated'] . "','" . $data['betCanceled'] . "','" . $data['isActive'] . "','" . $data['betNumberRedoblona'] . "','" . $data['betPositionRedoblona'] . "'" . ')';
		mysql_query($query) or die('Error en la consulta -> ' .  $query);
		$insertID = mysql_insert_id();

		$betData = $data["betData"];
		foreach ($betData as $lottery) {
			$queryLottery = 'INSERT INTO bet_data (bet_id,lottery_type,lottery_type_desc,lottery_name,lottery_name_desc) VALUES (' . "'" . $insertID . "','" . $lottery['lotteryTypeId'] . "','" . $lottery['lotteryType'] . "','" . $lottery['lotteryNameId'] . "','" . $lottery['lotteryName'] . "'" . ')';
    		mysql_query($queryLottery) or die('Error en la consulta -> ' .  $queryLottery);
    	}
    	echo $insertID;
    	$this->close();
	}

	public function checkIfVendorIsActive($data){
		$this->connect();		
		$query =  'SELECT vendor_is_active FROM vendors WHERE id_vendor="' . $data['idVendor'] . '"';

		$result = mysql_query($query);
		$row = mysql_fetch_assoc($result);

		$dataQuery = array();
		$obj = new stdClass();
		$obj->isActive = $row['vendor_is_active'];
		array_push($dataQuery, $obj);

		echo json_encode($dataQuery);
		$this->close();
	}
}

?>