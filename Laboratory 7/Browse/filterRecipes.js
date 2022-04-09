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

      console.log("hello")
      const types = $("[name='types']")[0].value;
    console.log(types)

      $.ajax({
          type: "GET",
          url: "../Browse/filterRecipes.php",
          data: {
              types
          },
         success: function(data){
              $("#table-container").html(data);

         }
      });
  });

