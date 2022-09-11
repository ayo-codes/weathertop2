"use strict"

const calculation = require("./calculations");
const { read } = require("fs-extra");

const analytics=  {
 getSmallestWeatherCode(station){  //to first test my ability to pass data
   let smallestWeatherCode = null;
   if ( station.readings.length > 0) {
     smallestWeatherCode = station.readings[0].code;
     for (let i = 1; i < station.readings.length; i++) {
       if (station.readings[i].code < smallestWeatherCode) {
         smallestWeatherCode = station.readings[i].code;
       }
     }
   }
   return smallestWeatherCode;
 },


  getLastReading(readings) {
   return readings[readings.length - 1];
},

  icon(station){
   return station.icon;
  },

  getMaxTemp(station){
    let maxTemp = null;
    if ( station.readings.length > 0) {
      maxTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature > maxTemp) {
          maxTemp = station.readings[i].temperature;
        }
      }
    }
    return maxTemp;
  },

  getMinTemp(station){
    let minTemp = null;
    if ( station.readings.length > 0) {
      minTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature < minTemp) {
          minTemp = station.readings[i].temperature;
        }
      }
    }
    return minTemp;
  },

  getMinWind(station) {
    let minWind = null;
    if (station.readings.length > 0) {
      minWind = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed < minWind) {
          minWind = station.readings[i].windSpeed;
        }
      }
    }
    return minWind;
  },

  getMaxWind(station) {
    let maxWind = null;
    if (station.readings.length > 0) {
      maxWind = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed > maxWind) {
          maxWind = station.readings[i].windSpeed;
        }
      }
    }
    return maxWind;
  },

  getMaxPressure(station) {
    let maxPressure = null;
    if (station.readings.length > 0) {
      maxPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure > maxPressure) {
          maxPressure = station.readings[i].pressure;
        }
      }
    }
    return maxPressure;
  },

  getMinPressure(station) {
    let minPressure = null;
    if (station.readings.length > 0) {
      minPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure < minPressure) {
          minPressure = station.readings[i].pressure;
        }
      }
    }
    return minPressure;
  },

  getTempTrend(station) {
    if (station.readings.length > 2) {
      let trend1 = station.readings[station.readings.length - 3]; //get 3 most recent readings
      let trend2 = station.readings[station.readings.length - 2];
      let trend3 = station.readings[station.readings.length - 1];
      let tempTrend = "";
      if (trend3.temperature > trend2.temperature && trend2.temperature > trend1.temperature) {
        tempTrend = "arrow  up icon";
      } else if (trend3.temperature < trend2.temperature && trend2.temperature < trend1.temperature) {
        tempTrend = "arrow  down icon";
      } else {
        tempTrend = "arrows alternate vertical icon";
      }
      return tempTrend;
    }
  },
  getWindTrend(station) {
    if (station.readings.length > 2) {
      let trend1 = station.readings[station.readings.length - 3]; //get 3 most recent readings
      let trend2 = station.readings[station.readings.length - 2];
      let trend3 = station.readings[station.readings.length - 1];
      let windTrend = "";
      if (trend3.windSpeed > trend2.windSpeed && trend2.windSpeed > trend1.windSpeed) {
        windTrend = "arrow  up icon";
      } else if (trend3.windSpeed < trend2.windSpeed && trend2.windSpeed < trend1.windSpeed) {
        windTrend = "arrow  down icon";
      } else {
        windTrend = "arrows alternate vertical icon";
      }
      return windTrend;
    }
  },
  getPressureTrend(station) {
    if (station.readings.length > 2) {
      let trend1 = station.readings[station.readings.length - 3]; //get 3 most recent readings
      let trend2 = station.readings[station.readings.length - 2];
      let trend3 = station.readings[station.readings.length - 1];
      let pressureTrend = "";
      if (trend3.pressure > trend2.pressure && trend2.pressure > trend1.pressure) {
        pressureTrend = "arrow  up icon";
      } else if (trend3.pressure < trend2.pressure && trend2.pressure < trend1.pressure) {
        pressureTrend = "arrow  down icon";
      } else {
        pressureTrend = "arrows alternate vertical icon";
      }
      return pressureTrend;
    }
  },
  updateWeather(station){  // this creates additional fields in the station array, which can then be shown on the dashboard view in the dashboard.js controller
    if (station.readings.length > 0) {
      station.code = this.getLastReading(station.readings).code;
      station.currentWeather = calculation.currentWeather(Number(station.code));
      station.tempC = this.getLastReading(station.readings).temperature;
      station.pressure = this.getLastReading(station.readings).pressure;
      station.windSpeed = this.getLastReading(station.readings).windSpeed;
      station.windDirection = this.getLastReading(station.readings).windDirection;
      station.windSpeedToBft = calculation.windSpeedToBft(station.windSpeed);
      station.cToF = calculation.cToF(station.tempC);
      station.degreesToCompass = calculation.degreesToCompass(station.windDirection);
      station.windChill = calculation.windChill(station.tempC, station.windSpeed);
      station.icon = calculation.icon(Number(station.code));
      station.maxTemp = analytics.getMaxTemp(station);
      station.minTemp = analytics.getMinTemp(station);
      station.minWind = analytics.getMinWind(station);
      station.maxWind = analytics.getMaxWind(station);
      station.maxPressure = analytics.getMaxPressure(station);
      station.minPressure = analytics.getMinPressure(station);
      station.tempTrend  = analytics.getTempTrend(station);
      station.windTrend = analytics.getWindTrend(station);
      station.pressureTrend = analytics.getPressureTrend(station);
    }
  }
};


module.exports = analytics;