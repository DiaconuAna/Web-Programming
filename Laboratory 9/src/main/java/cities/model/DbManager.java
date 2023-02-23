package cities.model;

import cities.domain.User;

import java.sql.*;

public class DbManager {

    private static Connection connection;

    public static void connect(){
        if(connection == null){
            String url = "jdbc:mysql://localhost:3306/transportation";

            try{
                Class.forName("com.mysql.cj.jdbc.Driver");
                connection = DriverManager.getConnection(url, "root", "doareu123");
            } catch (ClassNotFoundException | SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public static void disconnect(){
        try{
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        connection = null;
    }

    public static Connection getConnection(){
        if(connection == null)
            connect();

        return connection;
    }
}
