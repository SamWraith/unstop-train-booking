import app from "./app.js";
import connectDB from "./db/config.js";
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
});



// MongoDB Connection
connectDB();





// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
