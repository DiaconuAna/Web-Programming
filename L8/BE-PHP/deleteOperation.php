<?php
include 'C:\xampp\htdocs\L8take2\backend\databaseconnection.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

global $conn;
$recipeID = file_get_contents("php://input");
$deleteQuery = "DELETE FROM recipe WHERE ID = ?";
$statement = $conn->prepare($deleteQuery);
$statement->bind_param("i", $recipeID);
$statement->execute();
$result = $statement->affected_rows;

if($result)
  echo json_encode("Recipe deleted successfully");




?>
