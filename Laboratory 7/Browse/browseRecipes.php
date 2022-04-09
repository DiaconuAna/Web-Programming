<?php

include '../databaseconnection.php';

global $conn;

// fetch query
function fetch_data(){


    global $conn;

    $query="SELECT r.ID,a.FirstName, a.LastName,r.Name, t.type, r.Description  FROM `recipe` R INNER JOIN `author` A on AuthorID = A.ID INNER JOIN `type` T on TypeID = T.ID;";
    $exec = mysqli_query($conn, $query);
    if(mysqli_num_rows($exec)>0){
        $row= mysqli_fetch_all($exec, MYSQLI_ASSOC);
        return $row;

    }else{
        echo "Nothing";
        return $row=[];
    }
}
$fetchData= fetch_data();
show_data($fetchData);

function show_data($fetchData){
    echo '<table border="1">
        <tr>
             <th>ID</th>
             <th>Recipe Name</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>';

    if(count($fetchData)>0){
        $sn=1;
        foreach($fetchData as $data){

            echo "<tr>
          <td>".$sn."</td>
          <td>".$data['Name']."</td>
          <td>".$data['FirstName']."</td>
          <td>".$data['LastName']."</td>
          <td>".$data['type']."</td>
          <td>".$data['Description']."</td>

   </tr>";

            $sn++;
        }
    }else{

        echo "<tr>
        <td colspan='7'>No Data Found</td>
       </tr>";
    }
    echo "</table>";
}

?>