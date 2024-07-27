const mongoose = require("mongoose");


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // MONGO_URI (Local Storage)
        /*await mongoose.connect("mongodb://localhost/myDatabase", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });*/
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        //process.exit(1);
    }
}

module.exports = connectDB;
