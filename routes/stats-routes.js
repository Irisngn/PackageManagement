/*
Showing the tota CRUD operations
*/
const express = require('express');
const router = express.Router();
const path = require('path');
const { db } = require('../fire-basestore');

// Renders the stats.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/stats.html')); 
});

// Getting the stats data of crud operations
router.get('/data', async (req, res) => {
    const statsDocRef = db.collection('data').doc('stats');
    const doc = await statsDocRef.get();
    const stats = doc.data();  
    
    res.json({ 
        insert: stats.insert, 
        retrieve: stats.retrieve, 
        update: stats.update, 
        delete: stats.delete 
    });
});

module.exports = router;
