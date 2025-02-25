<?php
	/**phpinfo();*/
	$conf = include('db-conn.php');
	$server = $conf['server'];
	$user = $conf['user'];
	$password = $conf['password'];
	
	try {
		$conn = new PDO("mysql:host=$server;dbname=budget", $user, $password);
		// set the PDO error mode to exception
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		$data = $conn->query('SELECT id, date, money, intake, description FROM planning')->fetchAll();
		
		$arr = [];
		foreach ($data as $row){
			array_push($arr, [
				"id" => $row['id'],
				"date" => $row['date'],
				"money" => $row['money'],
				"intake" => $row['intake'],
				"description" => $row['description']
			]);
		}
		echo json_encode(['state' => 'success', 'data' => $arr]);
	} catch(PDOException $e) {
		echo json_encode(['state' => 'error', 'data' => $e->getMessage()]);
	}
	
	
	
?>