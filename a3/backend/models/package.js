const mongoose = require("mongoose");


const packageSchema = mongoose.Schema({
    package_id:{
        type: String,
        default: function() {
            const randomLetters = Math.random().toString(36).substring(2, 4).toUpperCase();
            
            const firstName = "Iris";
            const lastName = "Nguyen";
            const randomDigits = Math.floor(100 + Math.random() * 900); 
            return `P${randomLetters}-${firstName.charAt(0)}${lastName.charAt(0)}-${randomDigits}`;
        },
        unique: true,
        required: true
    },
    package_title: {
        type: String,
        validate: {
            validator: function(value) {
                return value.length >= 3 && value.length <= 15;
            },
            message: 'Package name must be between 3 and 15 characters.'
        },
        match: /^[A-Za-z0-9\s]+$/,  
        required: true
    },
    package_weight: {
        type: Number,
        min: 0, 
        required: true
    },
    package_destination: {
        type: String,
        validate: {
            validator: function(value) {
                return value.length >= 3 && value.length <= 15;
            },
            message: 'Destination must be between 5 and 15 characters.'
        },
        required: true,
    },
    description: {
        type: String,
        validate: {
            validator: function(value) {
                return value.length <= 30;
            },
            message: 'Description must be between 0 and 30 characters.'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now, 
        required: true
    },
    isAllocated: {
        type: Boolean,
    },
    assigned_driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'driver'
    }


});

module.exports = mongoose.model("package", packageSchema);
