import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
    seatNumber: Number,
    isBooked: Boolean
});

const Seat = mongoose.models.Seat || mongoose.model('Seat', seatSchema);

export default Seat;