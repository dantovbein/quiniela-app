<?php
class Storage {
	//public $host = "localhost";
	//public $host = "http://192.168.15.16/";
	//public $server = "root";
	//public $password = "";
	//public $dataBase = "quiniela";
	
	//public $host = "deaene.com.ar";
	public $host = "190.210.186.144";
	public $server = "deaene.com.ar";
	public $password = "arcomdeaene";
	public $dataBase = "deaene_com_ar";
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
		$obj->idPhone = $row['id_phone'];
		$obj->user = $row['user'];
		$obj->password = $row['password'];
		$obj->fullName = $row['full_name'];
		$obj->code = $row['code'];
		array_push($dataQuery, $obj);
		
		echo json_encode($dataQuery);
		/**/
		$this->close();	

	}
}
?>