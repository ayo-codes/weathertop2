"use strict";

const uuid = require("uuid"); //this brings in the unique id identifier
const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const analytics = require("../utils/analytics");
const _ = require("lodash");

const station = {
  index(request, response){
    const stationId = request.params.sid;
    logger.debug ("Station id =", stationId)

    const station = stationStore.getStation(stationId)
    const smallestWeatherCode = analytics.getSmallestWeatherCode(station);  //calls the function which returns a result to test my code
    console.log(smallestWeatherCode);
    const icon = analytics.icon(station);

    const viewData = {
      title: "Station",
      station: stationStore.getStation(stationId),
      smallestWeatherCode: smallestWeatherCode,
      icon: icon,
    };
    response.render("station", viewData);

  },
  addReading(request, response){
    const stationId = request.params.sid;  //get station id from parameter
    //const station = stationStore.getStation(stationId); //create a new variable to store stationId details
    const newReading = {   //create a new reading with the various fields
      rid: uuid.v1(),
      code: Number(request.body.code),
      temperature:Number (request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      date: request.body.date,
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);  //call the stationStore.addReading from the models
    response.redirect("/station/" + stationId);
  },
  deleteReading(request, response){
    const stationId = request.params.sid;
    const readingId = request.params.readingid;
    logger.debug("Deleting reading ${readingId} from Station ${stationId}" );
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  }
};


module.exports = station;
