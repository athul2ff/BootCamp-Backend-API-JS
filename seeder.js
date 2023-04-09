const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Bootcamp = require("./models/bootcamp");
const Course = require("./models/course");

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`));

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    //   const res = await Course.create(courses);
    console.log("data imported ...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log("Data destroyed..".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

switch (process.argv[2]) {
  case "-i":
    importData();
    break;
  case "-d":
    deleteData();
    break;
  default:
    console.log("Enter a valid Key");
    break;
}
