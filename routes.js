"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require("./controllers/station.js");
const accounts =require("./controllers/accounts.js");
const user = require("./controllers/user.js");


router.get("/dashboard", dashboard.index); //routes to the dashboard page
router.get("/about", about.index); //routes to the about page
router.get("/station/:sid", station.index); //routes to the station page,as well as sending the station id(sid) as a parameter
router.get("/dashboard/deletestation/:sid", dashboard.deleteStation); // routes to the ability to delete a station from the dashboard page
router.post("/dashboard/addstation", dashboard.addStation); //route to add station from the dashboard page
router.post("/station/:sid/addreading", station.addReading); //route to add a reading on the station page
router.get("/station/:sid/deletereading/:readingid", station.deleteReading); // route to delete a reading

//login/signup routes

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

//
router.get("/user/:uid", user.index);
router.post("/user/updateuser/:uid", user.update);

module.exports = router;
