function getCities(callbackFunction){
    $.getJSON("CitiesController", {action: "getAll"},
        callbackFunction);
}

function goBack(callbackFunction){
    $.getJSON("CitiesController", {action: "goBack", userId: sessionUserId},
        callbackFunction);
}

function addCityToList(cityId){
    $.post("CitiesController", {action: "addCity", cityId: cityId, userId: sessionUserId},
        function(){
        console.log("USER ID: " + sessionUserId);
            console.log("SUCCESS");
        }
    );
}

function getCityNeighbours(cityId, callbackFunction){
    $.getJSON("CitiesController", {action: "getNeighbours", cityId: cityId},
        callbackFunction)
}

function getLastCity(callbackFunction){
    $.getJSON("CitiesController", {action: "getLastStation", userId: sessionUserId},
        callbackFunction);
}

function getRoute(callbackFunction){
    $.getJSON("CitiesController", {action : "getRoute", userId: sessionUserId},
        callbackFunction);
}


$(document).ready(function () {
    console.log('hello world');


});
