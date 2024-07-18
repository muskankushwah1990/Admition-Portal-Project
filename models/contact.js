const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    first_name: {
        type: String,
        Required: true,
    },
    last_name: {
        type: String,
        Required: true,
    },
    email: {
        type: String,
        Required: true,
    },
    message: {
        type: String,
        Required: true,
    },
    user_id:{
        type: String,
        Required: true,
    },
    status:{
        type:String,
        default:"Pending"
    },
   
    
}, { timestamps: true })

const ContactModel = mongoose.model('contact', ContactSchema)
module.exports = ContactModel