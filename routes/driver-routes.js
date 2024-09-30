/*
Handle the resful api for driver routes
*/


const express = require('express');
const driverControl = require("../controllers/driver-controller");
const router = express.Router();
const checkAuthenticationapi = require("../checkAuthenticationapi");

//api adding new 
router.post('/add',checkAuthenticationapi, driverControl.createDriver);
//getting all driver
router.get('/', checkAuthenticationapi, driverControl.getAllDriver);
//delete driver by ID
router.delete('/remove', checkAuthenticationapi, driverControl.deleteDriverByID);
//router to update the driver
router.put('/:id', checkAuthenticationapi, driverControl.updateDriver);
// add package to driver
router.put("/add-package/:id", checkAuthenticationapi, driverControl.addPackageDriver);

module.exports = router;