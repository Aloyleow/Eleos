require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./controllers/userController");
const hostRouter = require("./controllers/hostControllers");
const eventRouter = require("./controllers/eventControllers");

const port = process.env.PORT;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/host", hostRouter);
app.use("/api/event", eventRouter);

app.listen(port, () =>{
    console.log(`Eleos listening on port ${port}`);
});
