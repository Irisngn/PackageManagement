const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const Driver = require('./models/driver');  
const Package = require('./models/package');  


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;


async function updateCrudCounter(operation) {
    const statsDocRef = db.collection('data').doc('stats');
    
    try {
        const statsDoc = await statsDocRef.get();
        
        if (!statsDoc.exists) {
            console.log("Stats document doesn't exist. Initializing...");
            const driverCount = await Driver.countDocuments();
            const packageCount = await Package.countDocuments();
    
            await statsDocRef.set({
                driverCount: driverCount,
                packageCount: packageCount,
                insert: 0,
                retrieve: 0,
                update: 0,
                delete: 0
            });

            console.log("Stats document initialized with current counts.");
        }

        await statsDocRef.update({
            [operation]: FieldValue.increment(1)
        });

        console.log(`${operation} counter incremented`);

    } catch (error) {
        console.error("Error updating counter: ", error);
    }
}

module.exports = { db, updateCrudCounter };
