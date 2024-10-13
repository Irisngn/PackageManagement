/*
Router to log out for the api
*/
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy(() => {
      res.status(200).json({ status: 'Success', message: 'Logged out successfully' });
    });
  });
module.exports = router;
