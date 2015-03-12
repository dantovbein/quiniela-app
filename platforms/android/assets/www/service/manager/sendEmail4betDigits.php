<?php
header('Access-Control-Allow-Origin: *');

if(isset($_POST['betNumber'])) { $betNumber = $_POST['betNumber']; }
if(isset($_POST['vendorName'])) { $vendorName = $_POST['vendorName']; }

$to = "dtovbein@gmail.com";
$subject = $vendorName . " ha subido una apuesta de 4 dígitos (" . $betNumber . ")";
$message = '<div style="width:800px;height:230px;background-color:#FCFCFC;position:relative;margin:0 auto;display:block;color:#000000;">
				<div style="width:780px;height:30px;padding:5px 10px;background-color:#004056;float:left;border-bottom:solid 5px #F1623D;position:relative;margin:5px 0 0 10px;">
					<div style="width:302px;height:53px;">
						<img src="http://yoviajoriveras.com/images/logo-mail.png" width="302" height="53" />
					</div>
				</div>
				<div style="width:800px;height:200px;float:left;">
					<ul style="display:inline-block;list-style:none;width:600px;">
						<li style="margin-botom:10px;float:left;display:block;width:600px;">
							<p style="font-size:20px;">
								<span style="float:left;">Número apostado:</span>
								<span style="font-weight:bold;float:left;margin-left:5px;">' . $betNumber . '</span>
							</p>
						</li>
						<li style="margin-botom:10px;float:left;display:block;width:600px;">
							<p style="font-size:20px;">
								<span style="float:left;">Vendedor:</span>
								<span style="font-weight:bold;float:left;margin-left:5px;">' . $vendorName . '</span>
							</p>
						</li>
					</ul>
				</div>
			</div>';

mail($to, $subject, $message,"Content-type: text/html; charset=iso-8859-1");	
?>