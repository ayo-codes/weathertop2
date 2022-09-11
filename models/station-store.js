"use strict";
const _ = require("lodash");
const JsonStore = require("./json-store"); //imports in the json-store file
const constants = require("constants");

const stationStore ={
  store: new JsonStore("./models/station-store.json" , {stationCollection: [] }),
  collection: "stationCollection",

  getAllStations() {    //gets a list of all the stations
    return this.store.findAll(this.collection);
  },

  getStation(sid) {   //gets a specific station based on the station id (sid) from station-store.json
    return this.store.findOneBy(
      this.collection, {sid: sid}
    );
  },

  removeStation(sid){  // this removes a station from the station-store.json by first getting the station using the method getStation above then using the json-store function remove it
    const station = this.getStation(sid);
    this.store.remove(this.collection, station);
    this.store.save();
  },

  addStation(station){ // this adds a station to the station-store.json
    this.store.add(this.collection, station);
    this.store.save();
  },

  addReading(rid, reading) {
    const station = this.getStation(rid);
    station.readings.push(reading);
    this.store.save();
  },

  removeReading(rid, readingId){
    const station = this.getStation(rid);
    const readings = station.readings;
    _.remove (readings, {rid: readingId});
    this.store.save();
  },

  getUserStations(userid){
    return this.store.findBy(this.collection, {userid: userid});  //// this will fetch the user id and only show playlists based on that userid
  },

  getReading(sid, readingId){
    const station = this.store.findOneBy(this.collection, {sid:sid});
    const readings = station.readings.filter(reading => reading.rid == readingId);
    return readings[0];
  },

  updateReading(reading , updatedReading) {
    reading.title = updatedReading.title;
    reading.code = updatedReading.code;
    reading.temp = updatedReading.temp;
    reading.windSpeed = updatedReading.windSpeed;
    reading.pressure = updatedReading.pressure;
    reading.icon = updatedReading.icon;
    this.store.save();
  }
};

module.exports = stationStore;  //// this exports the stationStore const we have just created to be used by other parts of the app