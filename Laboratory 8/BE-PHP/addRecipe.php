

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add recipe</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../style.css">

</head>
<body>
<div id = "addHeader">
    <h2>ADD RECIPE</h2>
</div>

<main>
    <form action = "addOperation.php" method="post" id = "add">
        <div id = "addDiv">
        <label>
            <label class = "add" for="authorID">Author Name:</label><br>
            <select name = "AuthorID" class = "add">
                <?php
                include '../databaseconnection.php';
                global $conn;
                $resultSet = $conn->query("SELECT * FROM `author`");
                while($rows = $resultSet->fetch_assoc()){
                    $id = $rows['ID'];
                    $first_name = $rows['FirstName'];
                    $last_name = $rows['LastName'];
                    echo "<option value = '$id' '$first_name' '$last_name'>$id.$first_name $last_name</option>";
                }
                ?>
            </select>
            <label class = "add" for="RecipeName">Recipe Name:</label><br>
            <input class = "add" type="text" name = "RecipeName" placeholder="Enter recipe name ..." required>
            <label class = "add" for="TypeID">Recipe Type:</label><br>
            <select class = "add" name = "TypeID">
                <?php
                //include 'databaseconnection.php';
                //global $conn;
                $resultSet = $conn->query("SELECT * FROM `type`");
                while($rows = $resultSet->fetch_assoc()){
                    $id = $rows['ID'];
                    $type = $rows['type'];
                    echo "<option value = '$id''$type'>$id.$type</option>";
                }
                ?>
            </select>
            <label class = "add" for="Description">Recipe Description:</label><br>
            <input class = "add" type="text" name = "Description" placeholder="Enter recipe description" required>
        </label>
        </div>
        <button class = "bt" type="submit">Add</button>
    </form>

    <button class = "bt" onclick="location.href='/Lab7take2//index.html'">Home</button>
</body>
</html>
