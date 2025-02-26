<?php
	/**phpinfo();*/
	if(!isset($_GET["date"])){
		die(json_encode(['state' => 'error', 'data' => 'date is missing']));
	}else if (!isset($_GET["money"])){
		die(json_encode(['state' => 'error', 'data' => 'money is missing']));
	}else if (!isset($_GET["type"])){
		die(json_encode(['state' => 'error', 'data' => 'type is missing']));
	}else if (!isset($_GET["description"])){
		die(json_encode(['state' => 'error', 'data' => 'description is missing']));
	}else if (!isset($_GET["id"])){
		die(json_encode(['state' => 'error', 'data' => 'id is missing']));
	}else {
		$date = date_create($_GET["date"]);
		$money = floatval($_GET["money"]);
		$type = $_GET["type"];
		$description = $_GET["description"];
		$id = intval($_GET["id"]);
	}
	
	if (!$date){
		die(json_encode(['state' => 'error', 'data' => 'date has the wrong format']));
	}else if ($money === 0 ){
		die(json_encode(['state' => 'error', 'data' => 'money is 0']));
	}else if(!($type === "income" or $type === "expense")){
		die(json_encode(['state' => 'error', 'data' => 'type must be income or expense']));
	}else if(strlen($description) > 250){
		die(json_encode(['state' => 'error', 'data' => 'description is longer then 250']));
	}else{
		if($type === "income")
			$intake = 1;
		if($type === "expense")
			$intake = 0;
	}
	
	$conf = include('db-conn.php');
	$server = $conf['server'];
	$user = $conf['user'];
	$password = $conf['password'];
	
	try {
		$conn = new PDO("mysql:host=$server;dbname=budget", $user, $password);
		// set the PDO error mode to exception
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		$date_format = date_format($date,"Y-m-d");
		
		$conn->query("UPDATE planning set date = '$date_format', money = $money, intake = $intake, description = '$description' WHERE id = $id");
		
		echo json_encode(['state' => 'success', 'data' => 'none']);
	} catch(PDOException $e) {
		echo json_encode(['state' => 'error', 'data' => $e->getMessage()]);
	}
	
	
	
?>