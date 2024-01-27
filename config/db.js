const mongoose = require('mongoose')

function connectDatabase() {
    mongoose.connect(process.env.MONGODB_URI).then((data) => {
        console.log("database connected");
    }).catch((error) => {
        console.log(error.message);
    })
}

module.exports = connectDatabase