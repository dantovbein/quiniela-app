<?php
class Storage {
	
	//public $host = "localhost";
	//public $server = "root";
	//public $password = "";
	//public $dataBase = "quiniela";
	
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

		$query = 'SELECT * FROM vendors WHERE user="' . $user . '" AND password="' . $password . '"';
		
		$result = mysql_query($query);
		$row = mysql_fetch_assoc($result);

		$dataQuery = array();
		$obj->idVendor = $row['id_vendor'];
		$obj->idDevice = $row['id_device'];
		$obj->user = $row['user'];
		$obj->password = $row['password'];
		$obj->fullName = $row['full_name'];
		$obj->code = $row['code'];
		array_push($dataQuery, $obj);
		
		echo json_encode($dataQuery);
		$this->close();	
	}

	public function sincronizeBet() {
		$this->connect();
		//$query = "INSERT INTO bets (bet_number,lottery_type,lottery_name,bet_order,amount_per_bet,total_amount) VALUES "





		$this->close();
	}
	/*public function insertBet() {
		$this->connect();
		$lotteryType = "23";
		$query = 'INSERT INTO bets (lottery_type) VALUES (' . $lotteryType . ');';
		$result = mysql_query($query) or die('Error en la consulta -> ' .  $query);
		echo mysql_insert_id();
		$this->close();
	}*/
}
?>