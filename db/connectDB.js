const { error } = require('console');
const mongoose = require('mongoose');
const local_URL = 'mongodb://127.0.0.1:27017/AdmissionPortalProject'
//mongodb atlas url
const live_URL = 'mongodb+srv://muskan:muskan1234@cluster0.3rmuvgt.mongodb.net/AdmissionPortalProject?retryWrites=true&w=majority&appName=Cluster0'



const connectDB = () => {
    return mongoose.connect(live_URL)
        .then(() => {
            console.log('connect successfully')
        }).catch((error) => {
            console.log(error)
        })
}

module.exports = connectDB