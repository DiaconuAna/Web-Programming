package cities.controller;

import cities.model.Authenticator;
import cities.domain.User;
import cities.model.DbManager;
import cities.service.CitiesService;
import cities.service.UserService;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.PreparedStatement;

public class LoginController extends HttpServlet {
    public LoginController() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // prints text data to a character stream.
        PrintWriter out = response.getWriter();

        response.setContentType("text/html");

        // get the parameters from the request
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        // check if the credentials are valid
        if(!UserService.checkCredentialsValid(username, password)){
            out.println("Invalid credentials!");
            return;
        }

        User myUser = UserService.getUserByUsername(username);

        // create a new session and save the user for the session
        HttpSession session = request.getSession();
        assert myUser != null;
        session.setAttribute("Id", myUser.getId());
        session.setAttribute("Username", username);

        CitiesService.deleteData(myUser.getId());
        response.sendRedirect("success.jsp");
    }
}

//  $.getJSON("topic-servlet", {action: "getAll"},
//        function (response) {
//            console.log(response);
//
//            $('#topics-table').html("");
//            $('#topics-table').append(
//                "<thead>" +
//                "<tr>" +
//                "<th style='visibility: collapse;' scope=\"col\"> Topic Id </th>" +
//                "<th scope=\"col\"> Name </th>" +
//                "<th scope=\"col\"> Comments </th>" +
//                "</tr>" +
//                "</thead>" +
//                "<tbody>");
//
//            for (var topic in response) {
//                topic = response[topic];
//                console.log(topic);
//                $('#topics-table').append(
//                    "<tr>" +
//                    "<td style='visibility: collapse;'>" + topic.id + "</td>" +
//                    "<td>" + topic.name + "</td>" +
//                    '<td><button type="button" class="detailsButton"> View Comments </button></td>' +
//                    "</tr>"
//                )
//            }
//
//            $('#topics-table').append(
//                "</tbody>"
//            )
//        }
//    )