<?php

include '../databaseconnection.php';


function addPopUp($message){
    echo "<script>
        alert('$message');
        location.href = '../index.html';</script>";

}


function deleteRecipe($id)
{
    global $conn;

    //if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    //$id = $_POST['id'];
    // $stmt = $mysqli->prepare("DELETE FROM myTable WHERE id = ?");
    //$stmt->bind_param("i", $_SESSION['id']);
    //$stmt->execute();
    //$stmt->close();

    //$deleteQuery = "DELETE FROM recipe WHERE id='$id'";
    $deleteQuery = $conn->prepare("DELETE FROM recipe WHERE id = ?");
    $deleteQuery->bind_param("s", $id);
    $deleteQuery->execute();

    echo "deleteID is ", $id;


    if ($deleteQuery->affected_rows) {
        return addPopUp("Successfully deleted!");
    } else {
        return addPopUp("Failure");

    }
    //}
}


if (isset($_GET['recipeID'])) {
    //echo func1($_POST['callFunc1']);
    $t = $_GET['recipeID'];
    echo $t;
    deleteRecipe($t);
    // if($fetchData!=[])
    //show_data($fetchData);
}

?>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Delete recipe</title>

    <link rel="stylesheet" type="text/css" href="../style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="deleteConfirmation.js" defer></script>


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
                include '../databaseconnection.php';
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
        <button id = "deleteButton" class = "bt" type="submit">Delete</button>

    </form>

    <button class = "bt" onclick="location.href='/Lab7take2//index.html'">Home</button>
</body>
</html>