<%@ page import="cities.domain.User" %>
<%@ page import="cities.domain.City" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Login Page</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="Resources/jquery-2.0.3.js"></script>
    <script src="Resources/cityscript.js"></script>
</head>
<body>

<%
    Integer id = (Integer) session.getAttribute("Id");
    String username = (String) session.getAttribute("Username");

    out.println("HEY USER Name " + session.getAttribute("Username") + "ID: " + session.getAttribute("Id"));

    if(id == null){
        response.sendRedirect("index.jsp");
        return;
    }
    else {
    %>
    <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand"> Welcome <%=username%>! This is your transportation app!</a>

        <%-- Logout --%>
        <form class="form-inline" action="LogoutController" method="post">
            <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit" name="logout" value="Logout">Logout</button>
        </form>

    </nav>
        <section>
            <table id = "cities-table" class = "table"></table>
        </section>

    <%-- See route button --%>
    <section>
        <button class = "btn-outline-dark" id = "routeButton">See Route</button>
        <button class = "btn-outline-dark" id = "undoButton">Go Back</button>
        <table id = "route-table" class = "table"></table>
    </section>

<script>
    var sessionUserId = "<%=id%>";

    $(document).ready(


        function (){
            getLastCity(function (city) {
               if(city.name == ""){

                   getCities( function (cities){
                       console.log(cities)

                       $("#route-table").html("");
                       $("#cities-table").html("");
                       $("#cities-table").append("<tr><th>Id</th><th>Name</th>");

                       for (var city in cities){
                           $("#cities-table").append("<tr><td>" + cities[city].id + "</td><td>" + cities[city].name + "</td> " +
                               "<td><button class='btnSelect'>Select</button></td> </tr>");
                       }
                   })
               }
               else{
                   getCityNeighbours(city.id, function (list){
                       console.log(list);

                       $("#route-table").html("");
                       $("#cities-table").html("");
                       $("#cities-table").append("<tr><th>Id</th><th>Name</th>");

                       for (var city in list){
                           $("#cities-table").append("<tr><td>" + list[city].id + "</td><td>" + list[city].name + "</td> " +
                               "<td><button class='btnSelect'>Select</button></td> </tr>");
                       }
                   });
               }

            });
            console.log("hello>")

            $("#cities-table").on('click','.btnSelect',function(){
                // get the current row
                var currentRow=$(this).closest("tr");

                var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                var col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD
                var data=col1+"\n"+col2+"\n";

                addCityToList(col1);
                getCityNeighbours(col1, function (list){
                    console.log(list);

                    $("#route-table").html("");
                    $("#cities-table").html("");
                    $("#cities-table").append("<tr><th>Id</th><th>Name</th>");

                    for (var city in list){
                        $("#cities-table").append("<tr><td>" + list[city].id + "</td><td>" + list[city].name + "</td> " +
                            "<td><button class='btnSelect'>Select</button></td> </tr>");
                    }
                });
                //alert(data);
            });

            $("#routeButton").click(function (){
                //console.log("hey?");
                getRoute(function (cities){

                    if (jQuery.isEmptyObject(cities))
                        alert("Empty route. Pick a city first");
                    else {
                        $("#route-table").html("");
                        $("#route-table").append("<tr><th>Station Number</th><th>City Name</th></tr>");
                        var i = 0
                        for (var city in cities) {
                            i++;
                            $("#route-table").append("<tr><td>" + i + "</td><td>" + cities[city].name + "</td></tr>");
                        }
                    }
                })
            });

            $("#undoButton").click(function (){
                getRoute(function (cities){
                    console.log("Empty : " + cities)
                    if (jQuery.isEmptyObject(cities))
                        alert("Cannot delete a station from an empty list!");
                    else{
                        getLastCity( function(lastStation){
                           console.log("LAST STATION: " + lastStation.name);
                           if(confirm("Do you want to come back from " + lastStation.name + "?") === true){
                                console.log("GOOD JOB!");
                                goBack(
                                    function (newRoute){
                                        if(jQuery.isEmptyObject(newRoute)){
                                            getCities( function (cities){
                                                console.log(cities)

                                                $("#route-table").html("");
                                                $("#cities-table").html("");
                                                $("#cities-table").append("<tr><th>Id</th><th>Name</th>");

                                                for (var city in cities){
                                                    $("#cities-table").append("<tr><td>" + cities[city].id + "</td><td>" + cities[city].name + "</td> " +
                                                        "<td><button class='btnSelect'>Select</button></td> </tr>");
                                                }
                                            })
                                        }
                                        else {
                                            $("#route-table").html("");
                                            $("#cities-table").html("");
                                            $("#cities-table").append("<tr><th>Id</th><th>Name</th>");

                                            for (var city in newRoute) {
                                                $("#cities-table").append("<tr><td>" + newRoute[city].id + "</td><td>" + newRoute[city].name + "</td> " +
                                                    "<td><button class='btnSelect'>Select</button></td> </tr>");
                                            }
                                        }
                                    }
                                )
                           }
                           else{
                               console.log("OK");
                           }
                        });
                    }
                })
                // get city list - if city list is empty display message - alert
                // else get last city id and display delete confirmation
                // in service implement delete method and return the updated list - GET
            });



            console.log("goodbye :(")
        }
    )
</script>
 <%
}
    %>

</body>
</html>

