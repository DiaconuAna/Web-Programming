<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Recipe Browsing Page</title>

    <link rel="stylesheet" type="text/css" href="../style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    <script src="browsingPage.js" defer></script>
    <script src="browsingRecipes.js" defer></script>
    <script src="filterRecipes.js" defer></script>

</head>
<body>

<div id = "browseHeader">
    <h2>BROWSE RECIPES</h2>
</div>

<form id = "filterForm">
    <div id = "filterDiv">
    <label>
        <label class = "browse" for="types">Previous filter:</label><br>
        <select name = "types" class = "browse">
            <?php
            include '../databaseconnection.php';
            global $conn;
            $resultSet = $conn->query("SELECT * FROM `type`");
            while($rows = $resultSet->fetch_assoc()){
                $id = $rows['ID'];
                $type = $rows['type'];
                echo "<option value = '$id''$type'>$id.$type</option>";
            }
            ?>
        </select>
    </label>
    </div>
    <button class = "bt" id="filterRecipes">Filter Recipes by Type</button>
</form>

<button class = "bt" id="browseRecipes">Browse Recipes</button>
<button class = "bt" onclick="location.href='/Lab7take2//index.html'">Home</button>

<div id="table-container"></div>


</body>
</html>