require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB(); // الاتصال بقاعدة البيانات

app.use(cors());
app.use(express.json());

app.use("/api/items", require("./routes/itemRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
