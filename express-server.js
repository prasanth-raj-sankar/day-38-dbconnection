import express from "express";
import cors from "cors";
import { connectbd } from "./db-utils/db-connection.js";
// import usersRouter from "./routes/users.js";
import urlsRouter from "./routes/urls.js";  // Import the URLs router
import { connectViaMongoose } from "./db-utils/mongoos-connetions.js";

const server = express();

// Middleware used by server to read the body of a request
server.use(express.json());
server.use(cors());


// link the studentRouter with express server
// server.use("/users", usersRouter);
server.use("/urls", urlsRouter);


const PORT = 4500;


// Method Top Level Module await
await connectViaMongoose();
await connectbd(); // this line will wait and connect to DB then next lines will executed

server.listen(PORT, () => {
  console.log("Server listening on ", PORT);
});