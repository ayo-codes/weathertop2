"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid"); // helps manage id's in the app
const stationStore = require("../models/station-store");
const accounts = require("./accounts.js");
const analytics = require("../utils/analytics");
//const station = require("./station");


const dashboard = {
  index(request, response) {   //index method on the controller, which controls the initial view
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const station = stationStore.getUserStations(loggedInUser.uid);
  for (let i= 0; i < station.length ; i++){
    analytics.updateWeather(station[i]);
  }
    const viewData = {
      title: "Your Weather Top Dashboard",  // this is the title you see in the browser bar
      stations: stationStore.getUserStations(loggedInUser.uid).sort((a,b) => a.sname.localeCompare(b.sname)),
      /* the code above creates a list of the stations from the stations array then alphabetically sorts them by sname which
       is the station name as stored in the station-store.json
       ref: (https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript)
      */
      uid: loggedInUser.uid,  // this creates the uid , that is used to populate the link to the profile page
      station: station,
    };
    logger.info("about to render" , stationStore.getAllStations());
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) {  // this method is used to delete a station, but getting the stationId from sid parameters, then calling the removeStation from the stationStore.js model
    const stationId = request.params.sid;
    logger.debug("Deleting Station ${StationId}");
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  },

  addStation(request, response) {  //this method adds a new station by creating  a newStation object first, and then calls on the stationStore.addStation method from the model to add the new station to the json file
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      sid: uuid.v1(),
      userid: loggedInUser.uid,
      sname: request.body.sname,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings:[],
    };
    logger.debug("Creating a new Station", newStation);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
