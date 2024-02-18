const mongoose = require("mongoose");

const connect = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/Blogs")
    .then(() => {
      console.log("Database connected 🫙 🫙 🫙");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connect;
