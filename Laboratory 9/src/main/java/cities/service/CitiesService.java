package cities.service;

import cities.domain.City;
import cities.model.DbManager;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.JSONArray;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CitiesService {

    private static List<City> selectedCities;

    public static String addCityJson(City city, String userId) throws JSONException {
        List<City> usercities = getUserCities(userId);
        usercities.add(city);

        JSONArray jsonArray = new JSONArray();

        for(City c: usercities){
            //System.out.println("SELECTED CITY: " + city);

            JSONObject jObj = new JSONObject();
            jObj.put("id", c.getId());
            jObj.put("name", c.getName());

            jsonArray.add(jObj);
        }

        String answer = jsonArray.toJSONString();
        //System.out.println("ANSWER: " + answer);

        return answer;
    }

    public static List<City> getUserCities(String userId){
        Connection connection = null;
        PreparedStatement statement = null;

        try{
            connection = DbManager.getConnection();

            String sql = "SELECT JsonRoute FROM userroute WHERE UserId = ?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, userId);

            statement.execute();

            ResultSet resultSet = statement.executeQuery();

            if(!resultSet.next()){
                return new ArrayList<>();
            }
            else{
                String jsonRoute = resultSet.getString("JsonRoute");
                //System.out.println("USER " + userId + "JSON: " + jsonRoute);

                ArrayList<String> stringArray = new ArrayList<String>();
                ArrayList<City> cities = new ArrayList<>();

                org.json.JSONArray jsonArray = new org.json.JSONArray(jsonRoute);

                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject jObj = new JSONObject();
                    City city = new City(jsonArray.getJSONObject(i).getString("id"), jsonArray.getJSONObject(i).getString("name"));
                    //System.out.println("City: " + city.getId() + "; " + city.getName());
                    cities.add(city);
                    stringArray.add(jsonArray.getString(i));
                }


                return cities;

            }
        } catch (SQLException | JSONException throwables) {
            throwables.printStackTrace();
        }
        return new ArrayList<>();
    }

    public CitiesService(){
        selectedCities = new ArrayList<>();
    }

    public static void deleteLastStation(String userId) throws JSONException {
        // do it for each user
        List<City> usercities = getUserCities(userId);
        usercities.remove(usercities.size()-1);

        JSONArray jsonArray = new JSONArray();

        for(City c: usercities){
            //System.out.println("SELECTED CITY: " + city);

            JSONObject jObj = new JSONObject();
            jObj.put("id", c.getId());
            jObj.put("name", c.getName());

            jsonArray.add(jObj);
        }

        // update it in the database ?

        Connection connection = null;
        PreparedStatement updateStatement = null;

        try {
            connection = DbManager.getConnection();
            String updateSql = "UPDATE userroute SET JsonRoute = ? WHERE UserId = ?";
            updateStatement = connection.prepareStatement(updateSql);
            updateStatement.setString(1, jsonArray.toJSONString());
            updateStatement.setString(2, userId.toString());

            updateStatement.execute();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


    }

    // todo: add user id
    public static City getLastStation(String userId){
        List<City> userCities = getUserCities(userId);
        System.out.println("USER CITIES size : " + userCities.size());
        if (userCities == null || userCities.isEmpty()){
            System.out.println("hey empty city");
            return new City();
        }
        else
            return userCities.get(userCities.size()-1);
    }

    // to do - get from database the json route based on the user id
    public static List<City> getSelectedCities(){
        if (selectedCities == null){
            return new ArrayList<City>();
        }
        else
            return selectedCities;

    }

    public static City getCity(String cityId){
        Connection connection = null;
        PreparedStatement statement = null;

        try{
            connection = DbManager.getConnection();

            String sql = "SELECT * FROM city WHERE Id = ?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, cityId);

            statement.execute();

            ResultSet resultSet = statement.executeQuery();

            if(!resultSet.next()){
                return new City();
            }
            else{
                String cityName = resultSet.getString("Name");

                return new City(cityId, cityName);

            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return new City();
    }

    public static List<City> getNeighbours(String cityId){
        Connection connection = null;
        PreparedStatement statement = null;

        try{
            connection = DbManager.getConnection();

            String sql = "SELECT NeighbourId FROM neighbours WHERE Id = ?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, cityId);

            ResultSet resultSet = statement.executeQuery();

            List<City> cities = new ArrayList<>();
            while(resultSet.next()){
                String neighbourId = resultSet.getString("NeighbourId");
                //System.out.println("NEIGHBOUR ID IS " + neighbourId);
                City city = getCity(neighbourId);
                //System.out.println("NEIGHBOUR CITY: " + city.getName());
                cities.add(city);
            }

            return cities;

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return new ArrayList<>();
    }

    public static void initializeData(){
        selectedCities = new ArrayList<>();
    }

    public static void deleteData(Integer userId){
        Connection connection = null;
        PreparedStatement statement = null;

        try{
            connection = DbManager.getConnection();

            String sql = "DELETE FROM `userroute` WHERE UserId = ?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, userId.toString());

            statement.execute();

            selectedCities = null;

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public static  void addCity(String cityId, Integer userId){

        //System.out.println("USER: " + userId);

        Connection connection = null;
        PreparedStatement statement = null;
        PreparedStatement statement2 = null;
        PreparedStatement statement3 = null;
        PreparedStatement insertStatement = null;
        PreparedStatement updateStatement = null;

        try{
            connection = DbManager.getConnection();

            String sql = "SELECT * FROM city WHERE Id = ?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, cityId);

            statement.execute();

            ResultSet resultSet = statement.executeQuery();

            if(!resultSet.next()){
                return;
            }

            if(selectedCities == null){
                selectedCities = new ArrayList<>();
            }
            String cityName = resultSet.getString("Name");

            //System.out.println("CITY IS: " + cityName);

            City city = new City(cityId, cityName);
            selectedCities.add(city);
            String answer = addCityJson(city, userId.toString());
            //todo: add in user json array
            //System.out.println(selectedCities);

            //String answer = citiesToJson(userId.toString());
            System.out.println("USER ID : " + userId + " JSON Cities: " + answer);

            String sqlUser = "SELECT * FROM users WHERE Id = ?";
            statement2 = connection.prepareStatement(sqlUser);
            statement2.setInt(1, userId);

            statement2.execute();

            ResultSet resultSet1 = statement2.executeQuery();

            if(!resultSet1.next()){
                return;
            }

            // check if the record is already in the database
            // no -> insert it
            // yes -> update it

            String sqlCheck = "SELECT * FROM userroute WHERE UserId = ?";
            statement3 = connection.prepareStatement(sqlCheck);
            statement3.setString(1, userId.toString());

            ResultSet resultSet2 = statement3.executeQuery();

            if(!resultSet2.next()){
                // insert
                String insertSql = "INSERT INTO userroute VALUES (?, ?)";
                insertStatement = connection.prepareStatement(insertSql);
                insertStatement.setString(1, userId.toString());
                insertStatement.setString(2, answer);

                insertStatement.execute();
            }
            else{
                // update
                String updateSql = "UPDATE userroute SET JsonRoute = ? WHERE UserId = ?";
                updateStatement = connection.prepareStatement(updateSql);
                updateStatement.setString(1, answer);
                updateStatement.setString(2, userId.toString());

                updateStatement.execute();

            }


        } catch (SQLException | JSONException throwables) {
            throwables.printStackTrace();
        }
    }

    public static String citiesToJson(String userId) throws JSONException {
        // TODO: select the cities of the current user

        List<City> userCities = getUserCities(userId);
        System.out.println("USER " + userId + " cities: " + userCities);
        if(userCities != null){

            JSONArray jsonArray = new JSONArray();

            for(City city: userCities){
                //System.out.println("SELECTED CITY: " + city);

                JSONObject jObj = new JSONObject();
                jObj.put("id", city.getId());
                jObj.put("name", city.getName());

                jsonArray.add(jObj);
            }

            String answer = jsonArray.toJSONString();
            //System.out.println("ANSWER: " + answer);

            return answer;
        }

        return null;
    }

    public static List<City> getCities(){
        Connection connection = null;
        PreparedStatement statement = null;

        List<City> cities = new ArrayList<>();

        try{
            connection = DbManager.getConnection();

            String sql = "select * from city";
            statement = connection.prepareStatement(sql);

            ResultSet resultSet = statement.executeQuery();

            while(resultSet.next()){
                City city = new City(resultSet.getString("Id"), resultSet.getString("Name"));
                cities.add(city);
            }

            resultSet.close();

            return cities;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return null;
    }
}
