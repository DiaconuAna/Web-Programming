<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

include 'C:\xampp\htdocs\L8take2\backend\databaseconnection.php';

global $conn;

$rows = array();
$selectQuery = mysqli_query($conn, "SELECT * FROM `author`");

while($r = mysqli_fetch_assoc($selectQuery)) {
  $rows[] = $r;
}

  echo json_encode($rows);

