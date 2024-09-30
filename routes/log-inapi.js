/*
File handel the log in api with post and try catch to checking
*/

const express = require('express');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
const router = express.Router();

//connect with firestore
const db = admin.firestore();

//using post log-in api
router.post('/', async (req, res) => {
const { user_name, password } = req.body;

const userRef = db.collection('users').doc(user_name);
const userDoc = await userRef.get();
//finding if the user doc is exisit ofr not
if (!userDoc.exists) {
    return res.status(400).json({ status: 'Failure', message: 'Invalid username or password' });
}

const userData = userDoc.data();
const passwordMatch = await bcrypt.compare(password, userData.password);

if (!passwordMatch) {
    return res.status(400).json({ status: 'Failure', message: 'Invalid username or password' });
}
//connect with users
req.session.user = { user_name };
req.session.logged_in = true;
req.session.save();

res.status(200).json({ status: 'Success', message: 'Login successful' });
});

module.exports = router;
