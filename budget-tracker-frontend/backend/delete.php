<?php
	/**phpinfo();*/
	if (!isset($_GET["id"])){
		die(json_encode(['state' => 'error', 'data' => 'id is missing']));
	}else {
		$id = intval($_GET["id"]);
	}
	
	$conf = include('db-conn.php');
	$server = $conf['server'];
	$user = $conf['user'];
	$password = $conf['password'];
	
	try {
		$conn = new PDO("mysql:host=$server;dbname=budget", $user, $password);
		// set the PDO error mode to exception
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$conn->query("DELETE FROM planning WHERE id = $id");
		
		echo json_encode(['state' => 'success', 'data' => 'none']);
	} catch(PDOException $e) {
		echo json_encode(['state' => 'error', 'data' => $e->getMessage()]);
	}
	
	
	
?>