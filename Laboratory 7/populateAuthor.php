<?php
include 'databaseconnection.php';

global $conn;

$resultSet = $conn->query("SELECT * FROM `author`");

while($rows = $resultSet->fetch_assoc()){
    $first_name = $rows['FirstName'];
    $last_name = $rows['LastName'];
    echo "<option value = '$first_name' '$last_name'>$first_name $last_name</option>";
                }



?>
