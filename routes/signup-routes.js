/*
Sign up routes to check and record the sign up information
*/
const express = require('express');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
const router = express.Router();

//connect with firestore
const db = admin.firestore();

//post method to post the information of sign up user
router.post('/signupSubmit', async (req, res) => {
  const { user_name, password, confirmPassword } = req.body;
  const saltRounds = 10;
        //user documents in the data base
        const userRef = db.collection('users').doc(user_name);
        const userDoc = await userRef.get();
        //check if the userDoc exisit or not
        if (userDoc.exists) {
            return res.status(400).send('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await userRef.set({
            username: user_name,
            password: hashedPassword,
        });
        //if not redirect it
        res.redirect('/');
});

module.exports = router;
