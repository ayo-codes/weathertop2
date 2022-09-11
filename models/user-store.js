"use strict";

const _ = require('lodash');
const JsonStore = require('./json-store');

const userStore = {

  store: new JsonStore('./models/user-store.json', {users: []}),
  collection:'users',

  getAllUsers(){
    return this.store.findAll(this.collection);
  },

  addUser(user){
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(uid){
    return this.store.findOneBy(this.collection, {uid: uid});
  },

  getUserByEmail(email){
    return this.store.findOneBy(this.collection, {email: email});
  },

  updateUser(user, updatedUser){
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    this.store.save();
  }
};

module.exports = userStore;