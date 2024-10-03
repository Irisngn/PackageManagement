const path = require('path');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Driver = require("./models/driver");
const cors = require('cors');
//connect to the data base
// Constants
const PORT_NUMBER = 8080;
const MONGO_URL = "mongodb://localhost:27017/A3FIT2095";

async function connectToDatabase(url) {
    try {
        await mongoose.connect(url);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));  // Adjust as needed

app.use(express.static('./dist/a3/browser'));

//Getting all drivers 
app.get("/34065016/Iris/drivers", async (req, res) => {
    const allDrivers = await Driver.find({});
    // await updateCrudCounter('retrieve');
    res.json(allDrivers);
});

//Adding new driver
app.post("/34065016/Iris/drivers", async (req, res) => {
    console.log(req.body);
    const { driver_name, driver_department, driver_licence } = req.body;
    const isActive = req.body.driver_isActive === 'on';
    const newDriver = new Driver({ driver_name, driver_department, driver_licence, driver_isActive: isActive });
    await newDriver.save();
    // await updateCrudCounter('insert');
    res.json(newDriver);
});

app.get("/34065016/Iris/drivers/:id", async (req, res) => {
    const driver = await Driver.findById(req.params.id);
    res.json(driver);
})

//update driver
app.put("/34065016/Iris/drivers/:id", async (req,res) => {
    const driver = await Driver.findById(req.params.id);
    driver.set(req.body);
    await driver.save();
    res.json(driver);
})

//delete driver
app.delete("/34065016/Iris/drivers/:id", async (req,res)=> {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    res.json(driver)

}) 

// Connect to the database and start the server
connectToDatabase(MONGO_URL);

app.listen(PORT_NUMBER, function () {
    console.log(`Server is listening on port ${PORT_NUMBER}`);
});


