/*
Handle the api routes for sign up 
*/
const express = require('express');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
const router = express.Router();

const db = admin.firestore();

//posting the user name, password and confirm password for sign up in api
router.post('/', async (req, res) => {
  const { user_name, password, confirmPassword } = req.body;
  const saltRounds = 10;

  if (password !== confirmPassword) {
    return res.status(400).json({ status: 'Failure', message: 'Passwords do not match' });
  }
    const userRef = db.collection('users').doc(user_name);
    const userDoc = await userRef.get();
    // json message when it not successfull
    if (userDoc.exists) {
      return res.status(400).json({ status: 'Failure', message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await userRef.set({
      username: user_name,
      password: hashedPassword,
    });

    //notify user successful or not
    res.status(200).json({ status: 'Success', message: 'Signup successful' });
});

module.exports = router;
