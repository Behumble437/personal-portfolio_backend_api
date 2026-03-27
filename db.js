require("node:dns/promises")
  .setServers(["1.1.1.1", "8.8.8.8"]);
  
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDB = async () => {
 try {
  await mongoose.connect(
   "mongodb+srv://admin:xhm789987@portfolio.lixvzkm.mongodb.net/portfolio"
  );

  console.log("MongoDB Connected");
 } catch (err) {
  console.log(err);
 }
};

module.exports = connectDB;