const express = require("express");
const mongoose = require("mongoose");
 const cors = require("cors"); 

const router = require("./routes/ToDoRoute")

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log(`Connected To MongoDB`))
    .catch((error) => {
      console.log(error)
    })

app.use(router)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));