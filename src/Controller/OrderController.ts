import UserModel from "../models/UserModel";
import * as process from "process";
import OrderModel from "../models/OrderModel";
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator');
const Stripe = require('stripe');


const stripe = new Stripe(process.env.STRIP_SECRET_KEY)


//placeOrder

const placeOrder = async (req: any, res: any) => {

    const frontend_url="http://localhost:5173";

    try {
        const newOrder = new OrderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save();
        await  UserModel.findByIdAndUpdate(req.body.userId,{cartData: {}})

        const line_items= req.body.items.map((item: { name: any; price: number; quantity: any; })=>({
            price_data:{
                currency:"lkr",
                product_data:{
                    name:item.name
                },
                unite_amount:item.price*100*300
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"lkr",
                product_data:{
                    name:"Delivery Charge"
                },
                unite_amount:2*100*300
            },
            quantity:1
        });

        const session =await  stripe.checkout.session.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })



        return res.status(200).json({success: true, message: "login Successfully ",session_url:session.session.url})
    } catch (error) {
        return res.status(500).json({success: false, message: " error"})
    }

}

export {placeOrder}