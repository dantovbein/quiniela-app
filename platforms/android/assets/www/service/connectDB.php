<?php
//$sql = mysql_connect("deaene.com.ar" , "deaene.com.ar" , "arcomdeaene") or die ('Error al conectarse a sql');
//mysql_select_db("deaene_com_ar") or die ("Error al conectarse a la Base de Datos");
//$sql = mysql_connect("localhost" , "root" , "") or die ('Error al conectarse a sql');
//mysql_select_db("quiniela") or die ("Error al conectarse a la Base de Datos");


$sql =  mysql_connect('190.210.186.144', 'deaene.com.ar', 'arcomdeaene');
if (!$sql) {
    die('No pudo conectarse: ' . mysql_error());
}
echo 'Conectado satisfactoriamente';
//mysql_close($enlace);
?>