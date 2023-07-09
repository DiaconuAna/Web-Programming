//// this is the id of the form
// $("#idForm").submit(function(e) {
//     var form = $(this);
//     var url = form.attr('action'); //PHP script URL can also be manually entered here if the form does not have the 'action' attribute set
//
//     // get the dataURL from the canvas element
//     var dataURL = encodeURIComponent(canvas.toDataURL());
//
//     // build AJAX data string
//     var dataString = form.serialize() + "&dataURL=" + dataURL;
//
//     $.ajax({
//         type: "POST",
//         url: url,
//         data: dataString,
//         success: function(data){
//             alert(data); // *optional* show response from the php script.
//         }
//     });
//
//     e.preventDefault(); // cancel actual form submission.
// });

//  $("#filterForm").submit(function (e){
// //
//      e.preventDefault();
// //
// //     var form = $(this);
// //     console.log($(this).serializeToString())
// //     var url = form.attr('action');
// //
//      $.ajax({
//         type: "GET",
//         url: "../Browse/filterRecipes.php" ,
//         dataType: "html",
//         success: function (data){
//             $("#table-container").html(data);
//         }
//      });
// //
 //});

//
//
  $(document).on('click','#filterRecipes',function(e){
      e.preventDefault();

     // console.log("hello")
      const types = $("[name='types']")[0].value;
   // console.log(types)

      $.ajax({
          type: "GET",
          url: "../Browse/filterRecipes.php",
          dataType : "json",
          data: {
              types,
          },
         success: function(data){
              //$("#table-container").html(data);
             console.log(data)
             showData(data)
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
    console.log(data);
    //var arr = $.parseJSON(data);
    //console.log(arr);

    for(let recipe of data){
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
