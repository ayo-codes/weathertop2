"use strict";

const logger = require("../utils/logger");
const accounts = require("./accounts");

const about = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("about rendering");
    const viewData = {
      title: "About Weather Top",
      uid: loggedInUser.uid,
    };
    response.render("about", viewData);
  },
};

module.exports = about;
