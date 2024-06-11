import express from "express";
import {loginUser, registerUser} from "../Controller/UserController";
import {placeOrder, verifyOrder} from "../Controller/OrderController";
import {authMiddleware} from "../middleware/authMiddleware";




const orderRouter = express.Router();



orderRouter.post("/place",authMiddleware, placeOrder)
orderRouter.post("/verify",authMiddleware, verifyOrder)



module.exports = orderRouter