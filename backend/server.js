require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path")
const userRouter = require("./controllers/userController");
const hostRouter = require("./controllers/hostControllers");
const userEventRouter = require("./controllers/userEventControllers");
const hostEventRouter = require("./controllers/hostEventControllers");
const publicinfoRouter = require("./controllers/publicInfoControllers")

const app = express();
const port = process.env.PORT || 8888;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Serve static files from the "dist" directory inside the "frontend" folder
app.use(express.static(__dirname, "../frontend/dist"));

// Handle all other requests by serving the index.html for your frontend
app.get("/*", (req, res) => {
  res.sendFile(__dirname, "../frontend/dist/index.html");
});

app.use("/api/user", userRouter);
app.use("/api/host", hostRouter);
app.use("/api/user/event", userEventRouter);
app.use("/api/host/event", hostEventRouter);
app.use("/api/publicinfo", publicinfoRouter)

app.listen(port, '0.0.0.0',() =>{
    console.log(`Eleos listening on port ${port}`);
});
