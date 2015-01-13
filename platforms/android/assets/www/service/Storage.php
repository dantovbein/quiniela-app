<?php
class Storage {
	
	/*public $host = "localhost";
	public $server = "root";
	public $password = "";
	public $dataBase = "quiniela";*/
	
	public $host = "190.210.186.144";
	public $server = "deaene.com.ar";
	public $password = "arcomdeaene";
	public $dataBase = "deaene_com_ar";

	/*public $host = "192.186.248.103";
	public $server = "yoviajoriveras.com";
	public $password = "Daiana1974";
	public $dataBase = "quiniela";*/
	
	private $sql;

	public function Storage() { }

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
		$obj->code = $row['vendor_unlock_code'];
		array_push($dataQuery, $obj);
		
		echo json_encode($dataQuery);
		$this->close();	
	}

	public function unlock($data) {
		$this->connect();

		$user = $data['user'];
		$unlockCode = $data['unlockCode'];

		$query = 'SELECT * FROM vendors WHERE id_vendor="' . $user . '" AND vendor_unlock_code="' . $unlockCode . '"';
		
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
		$query =  'INSERT INTO bets (bet_number,bet_position,id_device,id_vendor,bet_amount,bet_total_amount,bet_time_created,bet_time_canceled,is_active) VALUES (' . "'" . $data['betNumber'] . "','" . $data['betPosition'] . "','" . $data['idDevice'] . "','" . $data['idVendor'] . "','" . $data['betAmount'] . "','" . $data['betTotalAmount'] . "','" . $data['betCreated'] . "','" . $data['betCanceled'] . "'" . $data['isActive'] . "'" . ')';
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
}
?>