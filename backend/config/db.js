const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log("connected with db")
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB