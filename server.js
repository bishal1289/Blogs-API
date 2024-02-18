const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

const connect = require("./db/db");
connect();

app.use("/api", userRoutes);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started at PORT 3000 🚀🚀🚀`);
});
