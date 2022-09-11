"use strict"

const _ = require("lodash");

const calculation = {

  currentWeather(code)

  {
    const weatherCode = new Map([
      [100, "Clear"],
      [200,"Partial Clouds"],
      [300, "Cloudy"],
      [400, "Light Showers"],
      [500, "Heavy Showers"],
      [600, "Rain"],
      [700, "Snow"],
      [800, "Thunder"]
    ]);
    return weatherCode.get(code);
  },

  icon(code){

    let icon;
    switch (code){
      case code = 100:
      icon = "cloud sun";
      break;
      case code = 200:
      icon = "cloud sun";
      break;
      case code = 300:
        icon = "cloud";
        break;
      case code = 400:
        icon = "cloud sun rain";
        break;
      case code = 500:
        icon = "cloud showers heavy";
        break;
      case code = 600:
        icon = "cloud rain";
        break;
      case code = 700:
        icon = "snowflake";
        break;
      case code =800:
        icon = "bolt";
        break;
    }
    return icon;
  },

  windChill (tempC , windSpeed)
  {
    let wc = Number(13.12 + 0.6215 * tempC - 11.37 * (Math.pow(windSpeed,0.16)) + 0.3965 * tempC * (Math.pow(windSpeed, 0.16)));
    wc = Math.floor(wc);
    return wc;
  },

  windSpeedToBft(windSpeed)
  {
    let bft;
    if(windSpeed <=0){
      bft = 0;
    } else if (windSpeed > 0 && windSpeed <=5){
      bft = 1;
    }else if (windSpeed <=11){
      bft = 2;
    }else if (windSpeed <=19){
      bft = 3;
    }else if (windSpeed <=28){
      bft = 4;
    }else if (windSpeed <=38){
      bft = 5;
    }else if (windSpeed <=49){
      bft = 6;
    }else if (windSpeed <=61){
      bft = 7;
    }else if (windSpeed <=74){
      bft = 8;
    }else if (windSpeed <=88){
      bft = 9;
    }else if (windSpeed <=102){
      bft = 10;
    }else if (windSpeed <=117){
      bft = 11;
    }else if (windSpeed >=118){
      bft = 12;
    }else {
      bft = "error";
    }
    return bft;
  },

  cToF(tempC)
  {
    return Number( tempC * 9/5)+ 32;
  },

  degreesToCompass(windDirection)
  {
    if (windDirection > 348.75 || windDirection <11.25){
      return "North"
    }
   else  if (windDirection > 11.25 && windDirection <= 33.75) {
      return "North North East";
    } else if (windDirection > 33.75 && windDirection <= 56.25) {
      return "North East";
    } else if (windDirection > 56.25 && windDirection <= 78.75) {
      return "East North East";
    } else if (windDirection > 78.75 && windDirection <= 101.25) {
      return "East";
    } else if (windDirection > 101.25 && windDirection <= 123.75) {
      return "East South East";
    } else if (windDirection > 123.75 && windDirection <= 146.25) {
      return "South East";
    } else if (windDirection > 146.25 && windDirection <= 168.75) {
      return "South South East";
    } else if (windDirection > 168.75 && windDirection <= 191.25) {
      return "South";
    } else if (windDirection > 191.25 && windDirection <= 213.75) {
      return "South South West";
    } else if (windDirection > 213.75 && windDirection <= 236.25) {
      return "South West";
    } else if (windDirection > 236.25 && windDirection <= 258.75) {
      return "West South West";
    } else if (windDirection > 258.75 && windDirection <= 281.25) {
      return "West";
    } else if (windDirection > 281.25 && windDirection <= 303.75) {
      return "West North West";
    } else if (windDirection > 303.75 && windDirection <= 326.25) {
      return "North West";
    } else if (windDirection > 326.25 && windDirection <= 348.75) {
      return "North North West"
    } else {
      return "Problem dey ground";
    }
  },
};

module.exports = calculation;