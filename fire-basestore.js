const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json'); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
//connect with firebase store
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;  

//function to update crud operations
async function updateCrudCounter(operation) {
    //create data collection
    const statsDocRef = db.collection('data').doc('stats');

    try {
        //update the stats
        await statsDocRef.update({
            [operation]: FieldValue.increment(1)
        });
        //print the result if the crud operation is increased
        console.log(`${operation} counter incremented`);
    } catch (error) {
        console.error("Error updating counter: ", error);
    }
}

module.exports = { db, updateCrudCounter };
