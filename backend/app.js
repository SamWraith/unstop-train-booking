import express from "express";
import cors from "cors";




const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Hello World" });
})

// ! import routes
import seatRoutes from "./routes/seat.routes.js";


app.use('/api/v1/seats', seatRoutes);







export default app;