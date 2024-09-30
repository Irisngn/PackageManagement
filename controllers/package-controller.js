const package = require("../models/package");
const driver = require('../models/driver'); 
const { updateCrudCounter } = require("../fire-basestore");

module.exports = {
    // insert new package
    createPackage: async function(req,res){
        let aPackage = new package({
            package_title: req.body.package_title,
            package_weight: parseInt(req.body.package_weight),
            package_destination: req.body.package_destination,
            description: req.body.description,
            isAllocated: req.body.isAllocated,
            assigned_driver: req.body.driver_id

        });
        await aPackage.save();
        await updateCrudCounter('insert');
        res.status(201).json({
            id: aPackage._id,
            package_id: aPackage.package_id
        });
    },
    //listing all packaged and their driver details
    getAllPackage: async function (req, res) {
        let packages = await package.find().populate('assigned_driver');
        await updateCrudCounter('retrieve');
        res.json(packages);
    },
    //delete package by ID
    deletePackageByID: async function (req, res) {
        let packageID = req.query.package_id;
        let deletedPackage = await package.findOne({ _id: packageID });
        if (!deletedPackage) {
            return res.status(404).json({ status: "Package not found", deleted: false });
        }
        const result = await package.deleteOne({ _id: packageID });
        await driver.updateMany(
            { assigned_packages: packageID },
            { $pull: { assigned_packages: packageID } }  
        );
        await updateCrudCounter('delete');
        res.status(200).json(result);
    },
    
    //update Driver by ID
    updatePackage: async function (req, res) {
        try {
            let updatePackage = await package.findByIdAndUpdate(
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
    }
};
