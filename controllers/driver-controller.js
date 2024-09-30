const driver = require("../models/driver");
const package = require("../models/package");
const { updateCrudCounter } = require("../fire-basestore");
let totalDeleteDriver = 0;
module.exports = {
    //get total number in the index.html file
    totalnumber: async function(req,res){
        let totalDrivers = await driver.find({});
        let totalPackages = await package.find({});
        res.render("index.html", {driverCount: totalDrivers.length, packageCount: totalPackages.length});

    },
    //insert new driver
    createDriver: async function(req,res){
        let aDriver = new driver({
            driver_name: req.body.driver_name,
            driver_department: req.body.driver_department,
            driver_licence: req.body.driver_licence,
            driver_isActive: req.body.driver_isActive
        });
        await aDriver.save();
        await updateCrudCounter('insert');
        res.status(201).json({
            id: aDriver._id,
            driver_id: aDriver.driver_id
        });
    },
    // listing all the driver and the packages they owned
    getAllDriver: async function (req, res) {
        let drivers = await driver.find().populate('assigned_packages');
        await updateCrudCounter('retrieve');
        res.json(drivers);
    },
     //delete driver by ID
    deleteDriverByID: async function (req, res) {
        let driverId = req.query.driver_id;
        let deleteDriver = await driver.findOne({ _id: driverId});
        if (!deleteDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        let assignedPackages = deleteDriver.assigned_packages;
        if (assignedPackages && assignedPackages.length > 0) {
            await package.deleteMany({ _id: { $in: assignedPackages } });
        }

        const result = await driver.deleteOne({ _id: driverId });
        await updateCrudCounter('delete');
        res.status(200).json(result);
    },    

    //update driver and licence by ID
    updateDriver: async function (req, res) {
        let updatedDriver = await driver.findByIdAndUpdate(
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
        res.status(200).json({ status: "Driver updated successfully" });
    },
    //adding package to driver
    addPackageDriver: async function (req,res){
        let drivers = await driver.findOne({_id: req.params.id});
        console.log(drivers);
        let packages = await package.findOne({_id: req.query.packageID});
        console.log(packages);
        drivers.assigned_packages.push(packages._id);
        await drivers.save();
        res.status(200).json({ message: "Package added to driver", driver: drivers });
    }
}