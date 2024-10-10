const path = require('path');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Driver = require("./models/driver");
const cors = require('cors');
const Package = require("./models/package");
const { db } = require('./fire-basestore');  
const { updateCrudCounter } = require('./fire-basestore');
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
    const allDrivers = await Driver.find({}).populate('assigned_packages');
    await updateCrudCounter('retrieve');
    res.json(allDrivers);
});

//Adding new driver
app.post("/34065016/Iris/drivers", async (req, res) => {
    let aDriver = new Driver({
        driver_name: req.body.driver_name,
        driver_department: req.body.driver_department,
        driver_licence: req.body.driver_licence,
        driver_isActive: req.body.driver_isActive
    });
    await aDriver.save();
    const driverCount = await Driver.countDocuments();

    const statsDocRef = db.collection('data').doc('stats');
    await statsDocRef.update({
        driverCount: driverCount
    });
    await updateCrudCounter('insert');
    res.status(201).json({
        id: aDriver._id,
        driver_id: aDriver.driver_id
    });
}),

app.get("/34065016/Iris/drivers/:id", async (req, res) => {
    const driverId = req.params.id;

    if (!driverId || !mongoose.Types.ObjectId.isValid(driverId)) {
        return res.status(400).json({ message: 'Invalid or missing driver ID. Package does not have any assigned driver.' });
    }
    
    try {
        let driver = await Driver.findById(driverId).populate('assigned_packages');
        if (!driver) {
            return res.status(404).json({ message: 'This package does not have any assigned driver.' });
        }

        await updateCrudCounter('retrieve');
        return res.json(driver);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while retrieving the driver.' });
    }
});

app.get("/34065016/Iris/package/:id", async (req, res) => {
    const packageId = req.params.id;
    console.log(req.params);
    if (!packageId || !mongoose.Types.ObjectId.isValid(packageId)) {
        return res.status(400).json({ message: 'Invalid or missing driver ID. Package does not have any assigned driver.' });
    }
    try {
        let packages = await Package.findById(packageId).populate('assigned_driver');;
        await updateCrudCounter('retrieve');
        if (!packages) {
            return res.status(404).json({ message: 'This driver does not have any assigned package.' });
        }
        res.json(packages);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while retrieving the package.' });
    }
}),


//update driver
app.put("/34065016/Iris/drivers/:id", async (req,res) => {
    let updatedDriver = await Driver.findByIdAndUpdate(
        req.params.id,  
        { 
            driver_licence: req.body.driver_licence, 
            driver_department: req.body.driver_department
        },
        { new: true }  
    );
        
    if (!updatedDriver) {
        return res.status(404).json({ status: "Driver ID not found" });
    }
    await updateCrudCounter('update');
    res.status(200).json({ status: "Driver updated successfully" })
    
});


//delete driver
app.delete("/34065016/Iris/drivers/:id", async (req,res)=> {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    const driverCount = await Driver.countDocuments();
    const statsDocRef = db.collection('data').doc('stats');
    await statsDocRef.update({
        driverCount: driverCount
    });
    await updateCrudCounter('delete');
    res.json(driver)

});


//package
//Adding new package with authentication check
app.post("/34065016/Iris/package", async (req, res) => {
    let aPackage = new Package({
        package_title: req.body.package_title,
        package_weight: parseInt(req.body.package_weight),
        package_destination: req.body.package_destination,
        description: req.body.description,
        isAllocated: req.body.isAllocated,
        assigned_driver: req.body.driver_id

    });
    await aPackage.save();
    if (req.body.driver_id) {
        const assignedDriver = await Driver.findById(req.body.driver_id);
        assignedDriver.assigned_packages.push(aPackage._id);
        await assignedDriver.save();
    }
    const packageCount = await Package.countDocuments();

    const statsDocRef = db.collection('data').doc('stats');
    await statsDocRef.update({
        packageCount: packageCount
    });
    await updateCrudCounter('insert');
    res.status(201).json({
        id: aPackage._id,
        package_id: aPackage.package_id
    });
});

//listing package
app.get("/34065016/Iris/package", async (req, res) => {
    let packages = await Package.find().populate('assigned_driver');
    await updateCrudCounter('retrieve');
    res.json(packages);
});

app.delete("/34065016/Iris/package/:id", async function (req, res) {
    let packageID = req.params.id;  
    let deletedPackage = await Package.findById(packageID);
    
    if (!deletedPackage) {
        return res.status(404).json({ status: "Package not found", deleted: false });
    }

    const result = await Package.deleteOne({ _id: packageID });

    await Driver.updateMany(
        { assigned_packages: packageID },
        { $pull: { assigned_packages: packageID } }
    );
    const packageCount = await Package.countDocuments();

    const statsDocRef = db.collection('data').doc('stats');
    await statsDocRef.update({
        packageCount: packageCount
    });
    await updateCrudCounter('delete');
    res.status(200).json({ message: "Package deleted successfully", result });
});

app.put("/34065016/Iris/package/:id", async function (req, res) {
    try {
        let updatePackage = await Package.findByIdAndUpdate(
            req.params.id,  
            { 
                package_destination: req.body.package_destination, 
            },
            { new: true }  
        );
        if (!updatePackage) {
            return res.status(404).json({ status: "Package ID not found" });
        }
        await updateCrudCounter('update');
        res.status(200).json({ status: "Package updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error in update package", error });
    }
});
app.get('/34065016/Iris/statistics', async (req, res) => {
    try {
        const statsDocRef = db.collection('data').doc('stats');
        const statsDoc = await statsDocRef.get();

        if (!statsDoc.exists) {
            return res.status(404).json({ message: 'No statistics found' });
        }

        const driverCount = await Driver.countDocuments();  // Use MongoDB to count drivers
        const packageCount = await Package.countDocuments();  // Use MongoDB to count packages
        res.status(200).json({
            ...statsDoc.data(),
            driverCount,
            packageCount
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ message: 'Error fetching statistics' });
    }
});


// Connect to the database and start the server
connectToDatabase(MONGO_URL);

app.listen(PORT_NUMBER, function () {
    console.log(`Server is listening on port ${PORT_NUMBER}`);
});


