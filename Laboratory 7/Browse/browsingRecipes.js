 $(document).on('click','#browseRecipes',function(e){
     console.log("hello?")
     $.ajax({
         type: "GET",
         url: "../Browse/browseRecipes.php",
         dataType: "html",
         success: function(data){
             $("#table-container").html(data);

         }
     });
 });
