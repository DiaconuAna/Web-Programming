<?php
include 'C:\xampp\htdocs\L8take2\backend\databaseconnection.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

global $conn;


//if($_SERVER['REQUEST_METHOD'] == 'POST'){

$json = file_get_contents('php://input');
$recipe = json_decode($json, true);

//$recipe = json_decode(file_get_contents("php://input"), true);
$author_id = isset($recipe['authorId'])?$recipe['authorId']:1; //i
$recipe_name = isset($recipe['Name'])?$recipe['Name']:""; //s
$type_id = isset($recipe['typeId'])?$recipe['typeId']:1; //i
$description = isset($recipe['Description'])?$recipe['Description']:""; //s

    $insertQuery = $conn->prepare("INSERT INTO recipe(AuthorID, Name, TypeID, Description) VALUES(?, ?, ?, ?)");
    $insertQuery->bind_param("ssss", $author_id, $recipe_name, $type_id, $description);
    $insertQuery->execute();

    $result = $insertQuery->affected_rows;
    //$result = $insertQuery->get_result();

    if($result){
      echo json_encode("Nice");
    }

        //return addPopUp("Successfully added!");
    //}else{
        //return addPopUp("Failure");
    //}

?>
