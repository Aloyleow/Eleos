require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./controllers/userController");
const hostRouter = require("./controllers/hostControllers");
const userEventRouter = require("./controllers/userEventControllers");
const hostEventRouter = require("./controllers/hostEventControllers");
const publicinfoRouter = require("./controllers/publicInfoControllers")

const port = process.env.PORT;

const app = express();

app.use(express.static("../frontend/dist"));

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/host", hostRouter);
app.use("/api/user/event", userEventRouter);
app.use("/api/host/event", hostEventRouter);
app.use("/api/publicinfo", publicinfoRouter)

app.listen(port, () =>{
    console.log(`Eleos listening on port ${port}`);
});
