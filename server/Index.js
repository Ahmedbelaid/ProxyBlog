const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");


dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,

})
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

app.use("/api/auth", authRoute);



app.listen(3001, () => console.log("server running"));
