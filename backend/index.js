import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import { register } from "./controllers/auth.js";
import recoverPasswordRoute from "./routes/recoverPasswordRoute.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors()); // involve cross-origin resource sharing policy

app.post("/auth/register", register);

// ROUTES

app.use("/auth", authRoute);
app.use("/recover-password", recoverPasswordRoute);

// DATABASE CONFIGURATION
const dbUrl = process.env.MONGO_URL;
const PORT = process.env.PORT || 6001;

mongoose
	.connect(dbUrl)
	.then(() => {
		console.log("Connected to database.");
		app.listen(PORT, () => {
			console.log(`App is listening to port: ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
