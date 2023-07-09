<?php

include 'C:\xampp\htdocs\L8take2\backend\databaseconnection.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

global $conn;

$rows = array();
$selectQuery = mysqli_query($conn, "SELECT r.ID,a.FirstName, a.LastName,r.Name, t.type, r.Description  FROM `recipe` R INNER JOIN `author` A on AuthorID = A.ID INNER JOIN `type` T on TypeID = T.ID ORDER BY r.ID;");
//$finalHtml = "<table border='1' id = 'table-container'>
//        <thead>
//        <tr>
//            <th>Recipe Name</th>
//            <th>First Name</th>
//            <th>Last Name</th>
//            <th>Type</th>
//            <th>Description</th>
//        </tr>
//        </thead>";

while($row = mysqli_fetch_assoc($selectQuery)){

//    $finalHtml .= "<tr>";
//    $finalHtml .= "<td>".$row['Name']."</td>";
//    $finalHtml .= "<td>".$row['FirstName']."</td>";
//    $finalHtml .= "<td>".$row['LastName']."</td>";
//    $finalHtml .= "<td>".$row['type']."</td>";
//    $finalHtml .= "<td>".$row['Description']."</td>";
//    $finalHtml .= "</tr>";
  $recipe = array();
  array_push($recipe, $row['Name']);
  array_push($recipe, $row['FirstName']);
  array_push($recipe, $row['LastName']);
  array_push($recipe, $row['type']);
  array_push($recipe, $row['Description']);
//
  array_push($rows, $recipe);
}

//$finalHtml .= "<tr>
//       </tr></table>";

echo json_encode($rows);

?>
