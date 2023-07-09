$("#deleteButton").click(function (){
    console.log("hellooo")
    const recipeID = $("[name='id']")[0].value;
    console.log(recipeID);

    if(confirm('Are you sure to delete this recipe?'))
    {
        $.ajax({
            url: '../Operations//deleteRecipe.php',
            type: 'GET',
            data: {recipeID},
            error: function(data) {
                alert('Something is wrong');
            },
            success: function(data) {
                alert("Record removed successfully");
            }
        });
    }
});