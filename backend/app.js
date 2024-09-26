import express from "express";
import cors from "cors";
import { bookSeats, getSeats, initializeSeats } from "./controllers/seat.contoller.js";



const app = express();
app.use(cors());
app.use(express.json());


// ! import routes
import seatRoutes from "./routes/seat.routes.js";


app.use('/api/v1/seats', seatRoutes);







export default app;