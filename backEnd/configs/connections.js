const mongooose = require("mongoose");

exports.connectMongoDB = (databaseName = "") => {
  const connectionUrl = `${process.env.MONGODB_URL}/${
    process.env.MONGODB_DB || databaseName
  }`;
  //   const connectionUrl = `mongodb+srv://harsh27vardhan:<db_password>@foodclubcluster.8pw3q.mongodb.net/?retryWrites=true&w=majority&appName=foodClubCluster`;
  console.log(connectionUrl);
  mongooose
    .connect(connectionUrl)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB", err);
    });
};
