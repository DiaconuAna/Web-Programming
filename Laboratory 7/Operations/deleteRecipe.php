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

    $deleteQuery = "DELETE FROM recipe WHERE id='$id'";

    echo "deleteID is ", $id;


    if($deleteMysqliResult = mysqli_query($conn, $deleteQuery)){
        return addPopUp("Successfully deleted!");
    }
    else{
        return addPopUp("Failure");

    }
}
?>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Delete recipe</title>

    <link rel="stylesheet" type="text/css" href="../style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

</head>
<body>
<div id = "deleteHeader">
    <h2>DELETE RECIPE</h2>
</div>

<main>

    <form action = "deleteRecipe.php" method="post">
        <div id = "deleteDiv">
        <label>
            <label class = "delete" for="id">Select recipe name:</label><br>
            <select class = "delete" name = "id" id = "deletedropdown">
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
        </label>
    </div>
        <button class = "bt" type="submit">Delete</button>
    </form>

    <button class = "bt" onclick="location.href='/Lab7take2//index.html'">Home</button>
</body>
</html>