import Seat from "../models/seat.js";

const initializeSeats = async (req, res) => {
    const seats = await Seat.find();
    if (seats.length === 0) {
        const seatData = Array.from({ length: 80 }, (_, i) => ({ seatNumber: i + 1, isBooked: false }));
        await Seat.insertMany(seatData);
        res.send('Seats initialized!');
    } else {
        res.send('Seats already initialized.');
    }
}

const getSeats = async (req, res) => {
    const seats = await Seat.find();
    res.json(seats);
}

const bookSeats = async (req, res) => {
    const { numberOfSeats } = req.body;

    // Find available seats
    const availableSeats = await Seat.find({ isBooked: false });
    if (availableSeats.length < numberOfSeats) {
        return res.status(400).send('Not enough seats available.');
    }

    // Group seats by rows and prioritize same-row booking
    const seatsByRows = Array.from({ length: 12 }, (_, rowIndex) =>
        availableSeats.filter(seat => Math.floor((seat.seatNumber - 1) / 7) === rowIndex)
    );

    let seatsToBook = [];
    for (const row of seatsByRows) {
        if (row.length >= numberOfSeats) {
            seatsToBook = row.slice(0, numberOfSeats);
            break;
        }
    }

    // If same-row booking is not possible, find nearby seats
    if (seatsToBook.length === 0) {
        seatsToBook = availableSeats.slice(0, numberOfSeats);
    }

    // Mark the selected seats as booked
    const seatNumbers = seatsToBook.map(seat => seat.seatNumber);
    await Seat.updateMany({ seatNumber: { $in: seatNumbers } }, { $set: { isBooked: true } });

    res.json({ message: 'Seats booked successfully!', seats: seatNumbers });
}

export {
    initializeSeats,
    getSeats,
    bookSeats,
}