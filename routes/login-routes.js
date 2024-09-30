/*
Handle the log in function in the web page
*/
const express = require('express');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
const router = express.Router();
const db = admin.firestore();

router.post('/loginSubmit', async (req, res) => {
    const { user_name, password } = req.body;
  
    try {
    //Users collection in firebase
      const userRef = db.collection('users').doc(user_name);
      const userDoc = await userRef.get();
      //checking the information of the user doc data
      if (!userDoc.data()) {
        return res.status(400).send('Invalid username or password');
      }
  
      const userData = userDoc.data();
      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        return res.status(400).send('Invalid username or password');
      }
  
      req.session.loggedIn = true;
      req.session.user = { username: user_name };
      //save the sessions
      req.session.save();
      //redirect if done
      res.redirect('/');
    } catch (err) {
      console.error('Can not logging in:', err);
      res.status(500).send('Error: Unable to log in. Please try again later.');
    }
  });
  
module.exports = router;
