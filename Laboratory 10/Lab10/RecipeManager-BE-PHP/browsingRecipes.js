 $(document).on('click','#browseRecipes',function(e){
     console.log("hello?")
     $.ajax({
         type: "GET",
         url: "../Browse/browseRecipes.php",
         dataType : "json",
         success: function(data){
             //$("#table-container").html(data);
                showData(data);
         }
     });
 });

 function showData(data){
     //alert(data);
     let myTable ="<table> <tr> <th>ID</th> <th>Name</th> <th>First Name</th> <th>Last Name</th> <th>Type</th> <th>Description</th> </tr>"

     //var myRecipes = JSON.encode(data);
     //console.log(myRecipes)
     //
     // for(let recipe of myRecipes)

     // let tableData = "";

     for(let recipe of data.rows){
         console.log("recipe = ",recipe)
         console.log(recipe.ID);
         myTable += "<tr>" +
             "<td>"+recipe.ID+"</td>" +
             "<td>"+recipe.Name+"</td>" +
             "<td>"+recipe.FirstName+"</td>" +
             "<td>"+recipe.LastName+"</td>" +
             "<td>"+recipe.type+"</td>" +
             "<td>"+recipe.Description+"</td></tr>"
     }

     myTable += "</table>";
     console.log(myTable);
     //document.getElementById("table-container").appendChild(myTable);
     //$(myTable).appendTo("#table-container");
     $("#table-container").html(myTable)

 }
