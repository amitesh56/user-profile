const express = require("express");
const cookieParser = require("cookie-parser")
const authRoute = require("./routers/auth.router")
const profileRoute = require("./routers/profile.router")

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoute)
app.use("/user",profileRoute)

module.exports = app;