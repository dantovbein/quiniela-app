<?
class Storage2 {
	public $host = "localhost";	
	public $server = "root";
	public $password = "";
	public $dataBase = "iguazu";
	/*public $host = "190.210.186.72";	
	public $server = "instalacionesiguazu.com.ar";
	public $password = "Xbg0OL2l";
	public $dataBase = "instalacionesiguazu_com_ar";*/
	private $sql;

	public function Storage2() {	}

	private function connect() {
		$this->sql = mysql_connect($this->host , $this->server , $this->password) or die ('Error al conectarse a sql');
		mysql_select_db($this->dataBase) or die ("Error al conectarse a la Base de Datos");
	}

	private function close() {
		mysql_close($this->sql);
	}

	public function getAllCategories() {
		$this->connect();
		$query = "SELECT * FROM categories WHERE is_active=1 ORDER BY order_by ASC";
		$result = mysql_query($query) or die ("Error en la consulta de las categorias");
		$data = array();
		while($row = mysql_fetch_array($result)) {
			$obj = new stdClass;
			$obj->id = $row['id_category'];
			$obj->title = $row['title'];
			array_push($data, $obj);
		}
		echo json_encode($data);
		$this->close();
	}

	public function getHighlightedProducts(){
		$this->connect();
		$query = "SELECT * FROM products where is_highlighted=1 and is_active=1 ORDER BY title ASC";
		$result = mysql_query($query) or die ("Error en la consulta de los productos destacados");
		$data = array();
		while($row = mysql_fetch_array($result)) {
			$obj = new stdClass;
			$obj->id = $row['id_product'];
			$obj->category = $row['id_category'];
			$obj->relatedCategory = $row['related_category'];
			$obj->title = $row['title'];
			$obj->description = $row['description'];
			$obj->price = $row['price'];
			$obj->currency = $row['currency'];
			$obj->isActive = $row['is_active'];
			$obj->isHighlighted = $row['is_highlighted'];
			$obj->pictures = array();
			array_push($data, $obj);
		}

		for($i=0;$i<count($data);$i++) {
			$queryPictures = "SELECT * FROM picture_products WHERE id_product=" . $data[$i]->id . " ORDER BY position ASC";
			$resultPictures = mysql_query($queryPictures) or die ("Error en la consulta de las imagenes -> " . $queryPictures);
			$pictures = array();			
			while($row = mysql_fetch_array($resultPictures)) {
				$obj = new stdClass;
				$obj->id = $row['id_picture'];
				$obj->thumbnail = $row['picture_small'];
				$obj->thumb = $row['picture_medium'];
				array_push($data[$i]->pictures, $obj);
			}
		}

		echo json_encode($data);
		$this->close();
	}
	
	public function getProducts($idCategory) {
		$this->connect();
		$query = "SELECT * FROM products where id_category=$idCategory and is_active=1 ORDER BY title ASC";
		$result = mysql_query($query) or die ("Error en la consulta de los productos");
		$data = array();
		while($row = mysql_fetch_array($result)) {
			$obj = new stdClass;
			$obj->id = $row['id_product'];
			$obj->category = $row['id_category'];
			$obj->relatedCategory = $row['related_category'];
			$obj->title = $row['title'];
			$obj->description = $row['description'];
			$obj->price = $row['price'];
			$obj->currency = $row['currency'];
			$obj->isActive = $row['is_active'];
			$obj->isHighlighted = $row['is_highlighted'];
			$obj->pictures = array();
			array_push($data, $obj);
		}
		
		for($i=0;$i<count($data);$i++) {
			$queryPictures = "SELECT * FROM picture_products WHERE id_product=" . $data[$i]->id . " ORDER BY position ASC";
			$resultPictures = mysql_query($queryPictures) or die ("Error en la consulta de las imagenes -> " . $queryPictures);
			$pictures = array();			
			while($row = mysql_fetch_array($resultPictures)) {
				$obj = new stdClass;
				$obj->id = $row['id_picture'];
				$obj->thumbnail = $row['picture_small'];
				$obj->thumb = $row['picture_medium'];
				array_push($data[$i]->pictures, $obj);
			}
		}

		echo json_encode($data);
		$this->close();
	}

	public function getRelatedProducts($idCategory) {
		$this->connect();
		$query = "SELECT * FROM products where related_category=$idCategory and is_active=1 ORDER BY title ASC";
		$result = mysql_query($query) or die ("Error en la consulta de los productos");
		$data = array();
		while($row = mysql_fetch_array($result)) {
			$obj = new stdClass;
			$obj->id = $row['id_product'];
			$obj->category = $row['id_category'];
			$obj->relatedCategory = $row['related_category'];
			$obj->title = $row['title'];
			$obj->description = $row['description'];
			$obj->price = $row['price'];
			$obj->currency = $row['currency'];
			$obj->isActive = $row['is_active'];
			$obj->isHighlighted = $row['is_highlighted'];
			$obj->pictures = array();
			array_push($data, $obj);
		}

		for($i=0;$i<count($data);$i++) {
			$queryPictures = "SELECT * FROM picture_products WHERE id_product=" . $data[$i]->id . " ORDER BY position ASC";
			$resultPictures = mysql_query($queryPictures) or die ("Error en la consulta de las imagenes -> " . $queryPictures);
			$pictures = array();			
			while($row = mysql_fetch_array($resultPictures)) {
				$obj = new stdClass;
				$obj->id = $row['id_picture'];
				$obj->thumbnail = $row['picture_small'];
				$obj->thumb = $row['picture_medium'];
				array_push($data[$i]->pictures, $obj);
			}
		}

		echo json_encode($data);
		$this->close();
	}

	public function getProductsFromAdmin($idCategory) {
		$this->connect();
		$query = "SELECT * FROM products where id_category=$idCategory ORDER BY title ASC";
		$result = mysql_query($query) or die ("Error en la consulta de los productos");
		$data = array();
		while($row = mysql_fetch_array($result)) {
			$obj = new stdClass;
			$obj->id = $row['id_product'];
			$obj->category = $row['id_category'];
			$obj->relatedCategory = $row['related_category'];
			$obj->title = $row['title'];
			$obj->description = $row['description'];
			$obj->price = $row['price'];
			$obj->currency = $row['currency'];
			$obj->isActive = $row['is_active'];
			$obj->isHighlighted = $row['is_highlighted'];
			$obj->pictures = array();
			array_push($data, $obj);
		}

		for($i=0;$i<count($data);$i++) {
			$queryPictures = "SELECT * FROM picture_products WHERE id_product=" . $data[$i]->id . " ORDER BY position ASC";
			$resultPictures = mysql_query($queryPictures) or die ("Error en la consulta de las imagenes -> " . $queryPictures);
			$pictures = array();			
			while($row = mysql_fetch_array($resultPictures)) {
				$obj = new stdClass;
				$obj->id = $row['id_picture'];
				$obj->thumbnail = $row['picture_small'];
				$obj->thumb = $row['picture_medium'];
				array_push($data[$i]->pictures, $obj);
			}
		}

		echo json_encode($data);
		$this->close();
	}

	public function getProduct($id) {
		$this->connect();
		$query = "SELECT * FROM products where id_product=" . $id . " and is_active=1";
		$result = mysql_query($query) or die ("Error en la consulta del producto");
		$data = array();
		while($row = mysql_fetch_array($result)) {
			$obj = new stdClass;
			$obj->id = $row['id_product'];
			$obj->category = $row['id_category'];
			$obj->relatedCategory = $row['related_category'];
			$obj->title = $row['title'];
			$obj->description = $row['description'];
			$obj->price = $row['price'];
			$obj->currency = $row['currency'];
			$obj->isActive = $row['is_active'];
			$obj->isHighlighted = $row['is_highlighted'];
			$obj->pictures = array();
			array_push($data, $obj);
		}

		for($i=0;$i<count($data);$i++) {
			$queryPictures = "SELECT * FROM picture_products WHERE id_product=" . $id . " ORDER BY position ASC";
			$resultPictures = mysql_query($queryPictures) or die ("Error en la consulta de las imagenes -> " . $queryPictures);
			$pictures = array();			
			while($row = mysql_fetch_array($resultPictures)) {
				$obj = new stdClass;
				$obj->id = $row['id_picture'];
				$obj->thumbnail = $row['picture_small'];
				$obj->thumb = $row['picture_medium'];
				array_push($data[$i]->pictures, $obj);
			}
		}

		echo json_encode($data);
		$this->close();
	}

	public function getCategoryData($idCategory) {
		$this->connect();
		$query = "SELECT * FROM categories where id_category=$idCategory";
		$result = mysql_query($query) or die ("Error al catgar la data de la Cateoria");
		$data = array();
		while($row = mysql_fetch_array($result)) {
			$obj = new stdClass;
			$obj->id = $row['id_category'];
			$obj->title = $row['title'];
			array_push($data, $obj);
		}
		echo json_encode($data);
		$this->close();
	}

	public function addNewProduct($data) {
		$sql = mysql_connect($this->host , $this->server , $this->password) or die ('Error al conectarse a sql');
		mysql_select_db($this->dataBase) or die ("Error al conectarse a la Base de Datos");
		
		$query = 'INSERT INTO products (id_category,related_category,title,description,price,currency,is_active,is_highlighted) VALUES ("' . $data['category'] . '","' . $data['relatedCategory'] . '","' . $data['title'] . '","' . $data['description'] . '","' . $data['price'] . '","' . $data['currency'] . '","' . $data['isActive'] . '","' . $data['isHighlighted'] . '");';
		$result = mysql_query($query,$sql) or die('Error en la consulta -> ' .  $query);
		echo mysql_insert_id();
		mysql_close($sql);
	}

	public function updateProduct($data) {
		$this->connect();
		$query = 'UPDATE products SET title="' . $data['title'] . '", description="' . $data['description'] . '", id_category="' . $data['category'] . '", related_category="' . $data['relatedCategory'] . '", price="' . $data['price'] . '", is_active="' . $data['status'] . '", is_highlighted="' . $data['isHighlighted'] . '" WHERE id_product=' . $data['id'];
		$result = mysql_query($query) or die('Error en la consulta -> ' .  $query);
		$this->close();
	}

	public function removeProduct($data) {
		$this->connect(); 
		$queryProduct = 'DELETE FROM products WHERE id_product=' . $data['idProduct'];
		$resultProduct = mysql_query($queryProduct) or die('Error en la consulta -> ' .  $queryProduct);
		$queryPictures = 'DELETE FROM picture_products WHERE id_product=' . $data['idProduct'];
		$resultPictures = mysql_query($queryPictures) or die('Error en la consulta -> ' .  $queryPictures);
		$this->close();
	}

	public function removePicturesFromProduct($data) {
		$this->connect();
		$query = 'DELETE FROM picture_products WHERE id_product=' . $data['idProduct'];
		$result = mysql_query($query) or die('Error en la consulta -> ' .  $query);
		$this->close();
	}

	public function addImageProduct($data) {
		$this->connect();
		$query = 'INSERT INTO picture_products (id_product,picture_small,picture_medium,position) VALUES ("' . $data['idProduct'] . '","' . $data['thumbnail'] . '","' . $data['thumb'] . '","' . $data['position'] . '")';
		$result = mysql_query($query) or die('Error en la consulta -> ' .  $query);
		$this->close();
	}

	public function updateImageProduct($data) {
		$this->connect();
		$query = 'UPDATE product_images SET position="' . $data['position'] . '" WHERE id_image=' . $data['id'];
		$result = mysql_query($query) or die('Error en la consulta -> ' .  $query);
		$this->close();
	}

	public function removeImageProduct($data) {
		$this->connect();
		$query = 'DELETE FROM product_images WHERE id_image=' . $data['id'];
		$result = mysql_query($query) or die('Error en la consulta -> ' .  $query);
		$this->close();
	}

	public function addNewImageProduct($data) {
		$this->connect();
		$query = 'INSERT INTO product_images (id_product,thumbnail,thumb) VALUES ("' . $data['idProduct'] . '","' . $data['thumbnail'] . '","' . $data['thumb'] . '")';
		$result = mysql_query($query) or die('Error en la consulta -> ' .  $query);
		$this->close();
	}		
}
?>

