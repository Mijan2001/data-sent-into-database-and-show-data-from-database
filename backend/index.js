const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
require("dotenv").config();

const PORT = process.env.PORT || 3030;
const DB_URL = process.env.DB_URL;

// midleware configuration control

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//mongodb connection section
const mongodbConnection = mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((err) => {
    console.log({
      errors: err.message,
    });
  });

app.get("/", (req, res) => {
  res.status(200).json("This is home page");
});

app.post("/form", async (req, res) => {
  try {
    const newUserModel = new userModel(req.body);
    const saveUserModel = await newUserModel.save();
    res.status(200).json(saveUserModel);
    console.log("Data is saved successfully");
  } catch (error) {
    res.status(404).json({
      errors: error.message,
    });
    console.log("data is failed to sent");
    console.error(error);
  }
});

app.get("/form", async (req, res) => {
  try {
    const dataFromDatabase = await userModel.find();
    res.status(200).json(dataFromDatabase);
    console.log("Data is retrived from database successfully");
  } catch (error) {
    res.status(404).json("Data is not retrived properly");
    res.status(404).json({
      errors: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is connected http://127.0.0.1:${PORT}`);
});
