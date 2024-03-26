const express = require("express");
const mongoose = require("mongoose");

const databaseModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = new mongoose.model("model", databaseModel);
module.exports = userModel;
