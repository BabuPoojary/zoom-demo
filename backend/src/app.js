import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    // app.set("mongo_user")
    // const connectionDb = await mongoose.connect("mongodb+srv://BabuPoojary:RCSBSBc211197%23@cluster0.cujabk4.mongodb.net/")

    // console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
    // server.listen(app.get("port"), () => {
    //     console.log("LISTENIN ON PORT 8000")
    // });
    try {
        // Correct MongoDB connection string
        await mongoose.connect("mongodb+srv://BabuPoojary:RCSBSBc211197%23@cluster0.ekrmneh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        
        server.listen(app.get("port"), () => {
            console.log(`Server listening on port ${app.get("port")}`);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }



}



start();