require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./controllers/userController");
const hostRouter = require("./controllers/hostControllers");

const port = process.env.PORT;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/host", hostRouter);

app.listen(port, () =>{
    console.log(`Eleos listening on port ${port}`);
});
