const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/UserRoutes");
const postRouter = require("./routes/PostRoutes");
const followRouter = require("./routes/FollowRoutes");

const cors = require("cors")


const app = express();

app.use(express.json());


// ✅ ADD THIS (VERY IMPORTANT)
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL (Vite)
    credentials: true
}))

// ✅ FIRST: middleware
app.use(cookieParser());




// THEN: routes
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", followRouter);

module.exports = app;