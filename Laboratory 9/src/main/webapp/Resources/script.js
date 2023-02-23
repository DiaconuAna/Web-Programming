function getCities(callbackFunction){
    $.getJSON("CitiesController", {action: "getAll"},
        callbackFunction);
}

function addCityToList(cityId){
    $.post("CitiesController", {action: "addCity", cityId: cityId},
        function(data){
        console.log(data);
        }
    );
}


$(document).ready(function () {
    console.log('hello world');


});
