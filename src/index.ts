import Server from "./models/server";
import dotenv from 'dotenv';

//configuramos dot.env
dotenv.config();   

const server = new Server();
server.listen();