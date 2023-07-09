<?php

include '../databaseconnection.php';

global $conn;


function addPopUp($message){
    echo "<script>
        alert('$message');
        location.href = '../index.html';</script>";

}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $id = $_POST['id'];
    $descr = $_POST['description'];

    if(empty($descr))
        return addPopUp("Description should not be empty! Failure on update!");

    //$updateQuery = "UPDATE recipe SET Description = '$descr' WHERE id = '$id'";
    $updateQuery = $conn->prepare("UPDATE recipe SET description = ? WHERE id = ?");
    $updateQuery->bind_param("ss", $descr, $id);
    $updateQuery->execute();

    if($updateQuery->affected_rows){
        return addPopUp("Successfully updated!");
    }
    else{
        return addPopUp("Failure");
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Recipe Book</title>

    <link rel="stylesheet" type="text/css" href="../style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="Browse/browsingRecipes.js"></script>
    <script type="text/javascript" src="Browse/filterRecipes.js"></script>
</head>
<body>
<div id = "updateHeader">
    <h2>UPDATE RECIPE</h2>
</div>

<main>

    <form action = "updateRecipe.php" method = "post">
        <div id = "updateDiv">
        <label>
            <label class = "update" for="id">Recipe Name:</label><br>
            <select name = "id" class = "update">
                <?php
                include 'databaseconnection.php';
                global $conn;
                $resultSet = $conn->query("SELECT * FROM `recipe`");
                while($rows = $resultSet->fetch_assoc()){
                    $id = $rows['ID'];
                    $name = $rows['Name'];
                    echo "<option value = '$id''$name'>$id.$name</option>";
                }
                ?>
            </select>
            <label class = "update" for="description">New Description:</label><br>
            <input class = "update" type = "text" name = "description" placeholder="New description..." required>
        </label>
        </div>
        <button class = "bt" type = "submit">Update</button>
    </form>

    <button class = "bt" onclick="location.href='/Lab7take2//index.html'">Home</button>
</body>
</html>
