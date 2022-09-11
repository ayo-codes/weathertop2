"use strict";
const logger = require("../utils/logger");
const userStore = require("../models/user-store");
const accounts = require("./accounts");

const user = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const userId = request.params.uid;
    logger.debug("View User Profile ${userId}");
    const viewData = {
      title: "Edit User Profile",
      user: userStore.getUserById(userId),
      uid: loggedInUser.uid,
    };
    response.render("user", viewData);
  },

  update(request, response){
    const userId = request.params.uid;
    const user = userStore.getUserById(userId);
    const newUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password
    };
    logger.debug("updating user profile ")
    userStore.updateUser(user, newUser);
    response.redirect("/user/" + userId);
  }
};

module.exports = user;