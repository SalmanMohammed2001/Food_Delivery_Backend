import express from "express";
import {loginUser, registerUser} from "../Controller/UserController";
import {placeOrder} from "../Controller/OrderController";
import {authMiddleware} from "../middleware/authMiddleware";




const orderRouter = express.Router();



orderRouter.post("/placer",authMiddleware, placeOrder)



module.exports = orderRouter