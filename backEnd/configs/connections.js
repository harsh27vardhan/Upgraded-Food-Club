const mongooose = require("mongoose");

exports.connectMongoDB = (databaseName = "") =>{
    const connectionUrl = `${process.env.MONGODB_URL}/${process.env.MONGODB_DB || databaseName}`;
    console.log(connectionUrl);
    mongooose.connect(connectionUrl)
    .then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log("Failed to connect to MongoDB",err);
    })
}