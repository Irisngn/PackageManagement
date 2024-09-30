/*
Handle all the router api of the CRUD operations in package
*/
const express = require('express');
const packageControl = require('../controllers/package-controller');
const router = express.Router();
//Import authentication to check if the user logged in or not
const checkAuthenticationapi = require("../checkAuthenticationapi");

// Adding a new package with authentication
router.post('/add',checkAuthenticationapi, packageControl.createPackage);
// getting all package
router.get('/', checkAuthenticationapi, packageControl.getAllPackage);
//delete package
router.delete('/remove', checkAuthenticationapi, packageControl.deletePackageByID);
//update package
router.put('/:id', checkAuthenticationapi, packageControl.updatePackage);
module.exports = router;