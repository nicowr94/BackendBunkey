import express from "express";
import cors from "cors";
import morgan from "morgan";
import pkg from "../package.json";
import { createAdmi, createRoles } from "./libs/initialSetup";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/users.routes";
import studentRoutes from "./routes/students.routes";
import courseRoutes from "./routes/courses.routes";
import enrollmentRoutes from "./routes/enrollments.routes";

const app = express();
createRoles(); // start  app with the roles
createAdmi(); //start the application with an administrator user
app.set("pkg", pkg);

//settings
app.set("port", process.env.PORT || 8080);
app.use(morgan("dev"));

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.status(200).json({
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

export default app;
