<?php

include 'C:\xampp\htdocs\L8take2\backend\databaseconnection.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

global $conn;

$rows = array();
//$finalHtml = " <table>
//    <thead>
//    <tr>
//      <th>ID</th>
//      <th>Name</th>
//      <th>FirstName</th>
//      <th>LastName</th>
//      <th>Type</th>
//      <th>Description</th>
//    </tr>
//    </thead>";

$typeId = file_get_contents("php://input");

// SELECT r.ID,a.FirstName, a.LastName,r.Name, t.type, r.Description  FROM `recipe` R INNER JOIN `author` A on AuthorID = A.ID INNER JOIN `type` T on TypeID = T.ID;
$filterQuery=" SELECT r.ID,a.FirstName, a.LastName,r.Name, t.type, r.Description  FROM `recipe` R INNER JOIN `author` A on R.AuthorID = A.ID INNER JOIN `type` T on R.TypeID = T.ID WHERE TypeID = ?";
$statement = $conn->prepare($filterQuery);
$statement->bind_param("i", $typeId);
$statement->execute();
$resultSet = $statement->get_result();

while($row = mysqli_fetch_assoc($resultSet)) {

  $recipe = array();
  array_push($recipe, $row['ID']);
  array_push($recipe, $row['Name']);
  array_push($recipe, $row['FirstName']);
  array_push($recipe, $row['LastName']);
  array_push($recipe, $row['type']);
  array_push($recipe, $row['Description']);
//
  array_push($rows, $recipe);

//  $finalHtml .= "<tr>";
//  $finalHtml .= "<td>".$row["ID"]."</td>";
//  $finalHtml .= "<td>".$row['Name']."</td>";
//  $finalHtml .= "<td>".$row['FirstName']."</td>";
//  $finalHtml .= "<td>".$row['LastName']."</td>";
//  $finalHtml .= "<td>".$row['type']."</td>";
//  $finalHtml .= "<td>".$row['Description']."</td>";
//  $finalHtml .= "</tr>";

}
//$finalHtml .= "<tr>
//       </tr></table>";

echo json_encode($rows);
?>
