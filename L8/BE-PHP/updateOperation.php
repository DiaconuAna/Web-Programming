<?php

include 'C:\xampp\htdocs\L8take2\backend\databaseconnection.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

global $conn;

$json = file_get_contents('php://input');
$recipe = json_decode($json, true);

$recipe_id = isset($recipe['Id'])?$recipe['Id']:1;
$recipe_descr = isset($recipe['Description'])?$recipe['Description']:"";


$updateQuery = $conn -> prepare("UPDATE recipe SET Description = ? WHERE id = ?");
$updateQuery->bind_param("si", $recipe_descr, $recipe_id);
$updateQuery->execute();

$result = $updateQuery->affected_rows;

if($result){
  echo json_encode("Recipe updated successfully");
}
