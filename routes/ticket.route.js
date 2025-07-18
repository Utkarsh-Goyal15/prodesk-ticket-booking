import { Router } from "express";
import { bookTicket, createOrder } from "../controllers/ticket.controller.js";
import { verifyPayment } from "../middleware/verifyPayment.js";

const router=Router();

router.route('/order').post(createOrder);
router.route('/book').post(verifyPayment,bookTicket);
// router.route('/book').post(bookTicket);

export default router;
