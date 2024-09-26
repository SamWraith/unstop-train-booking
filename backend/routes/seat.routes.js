import { Router } from "express";
import { bookSeats, getSeats, initializeSeats } from "../controllers/seat.contoller.js";


const router = Router();

router.route('/initialize-seats').get(initializeSeats);
router.route('/').get(getSeats);
router.route('/book-seats').post(bookSeats);


export default router;