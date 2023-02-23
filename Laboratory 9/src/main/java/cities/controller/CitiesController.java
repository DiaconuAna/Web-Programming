package cities.controller;

import cities.domain.City;
import cities.service.CitiesService;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class CitiesController extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String action = request.getParameter("action");

        if((action != null) && action.equals("addCity")){
            String cityId = request.getParameter("cityId");

            HttpSession session = request.getSession();
            Integer userId = Integer.parseInt(request.getParameter("userId"));

            //System.out.println("hello1");
            CitiesService.addCity(cityId, userId);
            //System.out.println("hello2");
        }

        //System.out.println("HELLO THERE");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String action = request.getParameter("action");

        if( (action != null) && action.equals("goBack")){
            String userId = request.getParameter("userId");

            try {
                CitiesService.deleteLastStation(userId);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            // get the neighbours of the new last station
            City lastCity = CitiesService.getLastStation(userId);

            List<City> neighbours = CitiesService.getNeighbours(lastCity.getId());

            JSONArray jsonCities = new JSONArray();

            for(City city: neighbours){
                JSONObject jsonObject = new JSONObject();

                try{
                    jsonObject.put("id", city.getId());
                    jsonObject.put("name", city.getName());
                    jsonCities.add(jsonObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

            }
            //System.out.println("JSON UNDO Neighbours: " + jsonCities.toJSONString());
            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonCities.toJSONString());
            out.flush();

        }

        if( (action != null ) && action.equals("getLastStation")){
            String userId = request.getParameter("userId");
            City lastCity = CitiesService.getLastStation(userId);
            JSONObject jsonObject = new JSONObject();
            try {
                jsonObject.put("id", lastCity.getId());
                jsonObject.put("name", lastCity.getName());

                PrintWriter out = new PrintWriter(response.getOutputStream());
                //System.out.println("STATION JSON : " + jsonObject);
                out.println(jsonObject.toString());
                out.flush();

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        if( (action != null) && action.equals("getAll")){

            List<City> cities = CitiesService.getCities();
            response.setContentType("application/json");

            JSONArray jsonCities = new JSONArray();

            assert cities != null;
            for (City city : cities) {
                JSONObject jObj = new JSONObject();
                try {
                    jObj.put("id", city.getId());
                    jObj.put("name", city.getName());
                    jsonCities.add(jObj);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonCities.toJSONString());
            out.flush();
        }

        if((action != null) && action.equals("getRoute")){
            //System.out.println("HEY?");
            // todo - get cities list from service and return it as a json
            String userId = request.getParameter("userId");
            List<City> userCities = CitiesService.getUserCities(userId);
            //System.out.println("USER ROUTE: " + userCities);

            response.setContentType("application/json");

            JSONArray jsonCities = new JSONArray();

            for(City city: userCities){
                JSONObject jsonObject = new JSONObject();

                try{
                    jsonObject.put("id", city.getId());
                    jsonObject.put("name", city.getName());
                    jsonCities.add(jsonObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            //System.out.println("JSON ROUTE: " + jsonCities.toJSONString());
            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonCities.toJSONString());
            out.flush();
        }

        if((action != null) && action.equals("getNeighbours")){
            String cityId = request.getParameter("cityId");
            List<City> neighbours = CitiesService.getNeighbours(cityId);

            JSONArray jsonCities = new JSONArray();

            for(City city: neighbours){
                JSONObject jsonObject = new JSONObject();

                try{
                    jsonObject.put("id", city.getId());
                    jsonObject.put("name", city.getName());
                    jsonCities.add(jsonObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

            }
            //System.out.println("JSON Neighbours: " + jsonCities.toJSONString());
            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonCities.toJSONString());
            out.flush();
        }
    }
}
