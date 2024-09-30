const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
    driver_id:{
        type: String,
        default: function(){
            const randomDigits = Math.floor(Math.random() * 90 + 10);
            const studentID = "34065016".slice(0, 2);
            const randomLetters = Math.random().toString(36).substring(2, 5).toUpperCase();
            return `D${randomDigits}-${studentID}-${randomLetters}`;
        },
        unique: true,
        required: true
    },
    driver_name: {
        type: String,
        validate: {
            validator: function(value) {
                return value.length >= 3 && value.length <= 20;
            },
            message: 'Driver name must be between 3 and 20 characters.'
        },
        match: /^[A-Za-z0-9\s]+$/,  
        required: true
    },
    driver_department: {
        type: String,
        enum: ['Food', 'Furniture', 'Electronic'],  
        required: true
    },
    driver_licence: {
        type: String,
        match: /^[A-Za-z0-9]{5}$/,  
        required: true,
        message: "Driver license should be alphanumeric with a length of 5."
    },
    driver_isActive: {
        type: Boolean,
    },
    driver_createdAt: {
        type: Date,
        default: Date.now,  
        required: true
    },
    assigned_packages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'package'
    }]
});

module.exports = mongoose.model('driver', driverSchema);
