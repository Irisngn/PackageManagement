/**
 * Welcome to FIT2095
 * @author Iris Nguyen <kngu0105@student.monash.edu>
 */

// Imports
const path = require('path');
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const admin = require('firebase-admin');
const { updateCrudCounter } = require('./fire-basestore');
const driverControl = require("./controllers/driver-controller");
const driverRouter = require("./routes/driver-routes");
const packageRouter = require("./routes/package-routes");
const statsRoutes = require('./routes/stats-routes');
const loginRoutes = require('./routes/login-routes');
const signupRoutes = require('./routes/signup-routes');
const logoutRoutes = require('./routes/logout-routes'); 
const checkAuthentication = require("./checkAuthentication");
const serviceAccount = require('./service-account.json');
const Driver = require("./models/driver");
const Package = require("./models/package");
const signupRoutesApi = require("./routes/sign-upapi");
const loginRoutesApi = require("./routes/log-inapi");
const logoutRoutesApi = require("./routes/log-outapi");

// Constants
const PORT_NUMBER = 8080;
const MONGO_URL = "mongodb://10.192.0.4:27017/A2FIT2095";

// Express app initialization
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("images"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Set view engine to HTML via EJS
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Connect to MongoDB
async function connectToDatabase(url) {
    try {
        await mongoose.connect(url);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}
//calling all the routes and endpoint
app.use('/34065016/api/v1/drivers', driverRouter);
app.use('/34065016/api/v1/packages', packageRouter);
app.use('/34065016/stats', statsRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/', logoutRoutes); 
app.use('/34065016/api/v1/packages/signup', signupRoutesApi);
app.use('/34065016/api/v1/packages/login', loginRoutesApi);
app.use('/34065016/api/v1/packages/logout', logoutRoutesApi);


// Home page route
app.get("/", driverControl.totalnumber);

//Getting all drivers with authentication check
app.get("/34065016/Iris/drivers", checkAuthentication, async (req, res) => {
    const allDrivers = await Driver.find({});
    await updateCrudCounter('retrieve');
    res.render('drivers', { drivers: allDrivers });
});
// Getting all packages with authentication check
app.get("/34065016/Iris/packages", checkAuthentication, async (req, res) => {
    const allPackages = await Package.find({}).populate('assigned_driver');
    await updateCrudCounter('retrieve');
    console.log(allPackages);
    res.render('packages', { packages: allPackages });
});

// Adding driver with authentication check
app.get('/34065016/Iris/add-driver', checkAuthentication, async (req, res) => {
    const drivers = await Driver.find();
    res.render('add-driver', { drivers });
});

//Adding new driver with authentication check
app.post("/34065016/Iris/add-driver", checkAuthentication, async (req, res) => {
    const { driver_name, driver_department, driver_licence } = req.body;
    const isActive = req.body.driver_isActive === 'on';
    const newDriver = new Driver({ driver_name, driver_department, driver_licence, driver_isActive: isActive });
    await newDriver.save();
    await updateCrudCounter('insert');
    res.redirect("/34065016/Iris/drivers");
});
// Adding new package with authentication check
app.get("/34065016/Iris/add-package", checkAuthentication, async (req, res) => {
    const driverList = await Driver.find();
    res.render('add-package', { driverList });
});

//Adding new package with authentication check
app.post("/34065016/Iris/add-package", checkAuthentication, async (req, res) => {
    const {
        package_title,
        package_weight,
        package_destination,
        description,
        isAllocated,
        assigned_driver
    } = req.body;
    const driver = await Driver.findOne({ driver_id: req.body.driverID });
    console.log(driver);
    let driverObjectId = driver._id;

    const newPackage = new Package({
        package_title,
        package_weight,
        package_destination,
        description,
        isAllocated,
        assigned_driver: driverObjectId
    });
    await newPackage.save();
    await updateCrudCounter('insert');
    res.redirect("/34065016/Iris/packages");
});

// Driver deletion routes
app.get('/34065016/Iris/delete-driver', checkAuthentication, async (req, res) => {
    const drivers = await Driver.find();
    res.render('delete-driver', { drivers });
});

//Driver delete with authentication check
app.get('/34065016/Iris/delete-driver-submit', checkAuthentication, async (req, res) => {
    const id = req.query.driver_id;
    const isDeleted = await Driver.findOneAndDelete({ driver_id: id });

    if (isDeleted) {
        await Package.deleteMany({ driver_id: id });
        await updateCrudCounter('delete');
        res.redirect('/34065016/Iris/drivers');
    } else {
        res.redirect('/34065016/Iris/invalid-data');
    }
});

// Package deletion routes
app.get('/34065016/Iris/delete-package', checkAuthentication, async (req, res) => {
    const packages = await Package.find();
    res.render('delete-package', { packages });
});

app.get('/34065016/Iris/delete-package-submit', checkAuthentication, async (req, res) => {
    const id = req.query.package_id;
    const deletedPackage = await Package.findOneAndDelete({ package_id: id });

    if (!deletedPackage) {
        res.redirect('/34065016/Iris/invalid-data');
    } else {
        await updateCrudCounter('delete');
        res.redirect('/34065016/Iris/packages');
    }
});

// Department selection routes
app.get('/34065016/Iris/driver-department', checkAuthentication, (req, res) => {
    res.render('driver-department');
});


//Update department routes
app.post('/34065016/Iris/driver-department', checkAuthentication, async (req, res) => {
    const department = req.body.department;

    if (!department) {
        return res.redirect('/34065016/Iris/invalid-data');
    }

    const driversByDepartment = await Driver.find({ driver_department: department });
    res.render('driver-by-department', { drivers: driversByDepartment, department });
});

// Invalid data route
app.get("/34065016/Iris/invalid-data", (req, res) => {
    res.render("invalid-data");
});

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/logout", (req, res) => {
    res.render("logout");
})
// 404 error handling
app.get("*", (req, res) => {
    res.status(404).render("404");
});

// Connect to the database and start the server
connectToDatabase(MONGO_URL);

app.listen(PORT_NUMBER, function () {
    console.log(`Server is listening on port ${PORT_NUMBER}`);
});
