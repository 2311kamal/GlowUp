const mongoose = require('mongoose');

const DesignerModel = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        minlength: [2,"Name should be at least 2 characters."],
        max: 64,
        default: null,
    },
    email: {
        type: String,
        min: 1,
        max: 128,
        unique: true,
        required:true
    },
    phone: {
        type: String,
        min: 1,
        max: 128,
        unique: true,
        required:true
    },
    password: {
        type: String,
        min: [6,"Password should be at least 6 characters."],
        max: 64,
        required:true
    },
    address: {
        type: String,
        min: 20,
        max: 200,
        required:true
    },
    professional_title: {
        type: String,
        min: 1,
        max: 128,
        unique: true,
        required:true
    },
    cname: {
        type: String,
        minlength: [2,"Company name should be at least 2 characters."],
        max: 64,
        default: null,
    },
    experience: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: new Date(),
    }
});

module.exports = mongoose.model("DESIGNERSCHEMA", DesignerModel)