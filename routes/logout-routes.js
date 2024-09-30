/*
Router to handle the log out function in the web page, render the logou.html file
*/

const express = require('express');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
const router = express.Router();
const db = admin.firestore();

//using destroy for logged out
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error logging out:', err);
        return res.status(500).send('Error logging out.');
      }
      res.render('logout'); 
    });
  });
  
  
module.exports = router;
