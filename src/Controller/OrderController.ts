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
    //
     try {

     /*    console.log(req.body.userId)
         console.log(req.body.items)
         console.log(req.body.address)
         console.log(req.body.amount)
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



       return res.status(200).json({success: true, message: "order Successfully ",session_url:session.session.url})*/
         const newOrder = new OrderModel({
             userId: req.body.userId,
             items: req.body.items,
             amount: req.body.amount,
             address: req.body.address
         });

         // Saving the new order to the database
         await newOrder.save();

         // Clearing the user's cart data after placing the order
         await UserModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

         // Creating line items for the Stripe Checkout session
         const line_items = req.body.items.map((item: { name: any; price: number; quantity: any; }) => ({
             price_data: {
                 currency: "lkr",
                 product_data: {
                     name: item.name
                 },
                 unit_amount: item.price * 100 * 300 // Fixed typo here, it should be `unit_amount` instead of `unite_amount`
             },
             quantity: item.quantity
         }));

         // Adding delivery charge as a line item
         line_items.push({
             price_data: {
                 currency: "lkr",
                 product_data: {
                     name: "Delivery Charge"
                 },
                 unit_amount: 2 * 100 * 300
             },
             quantity: 1
         });

         // Creating a new Stripe Checkout session
         const session = await stripe.checkout.sessions.create({
             line_items: line_items,
             mode: 'payment',
             success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
             cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
         });

         // Sending the response with the session URL
         return res.status(200).json({ success: true, message: "Order successfully placed", session_url: session.url });

    } catch (error) {
        return res.status(500).json({success: false, message: " error"})
    }

}

const verifyOrder= async (req:any,res:any)=>{
        const {orderId,success}=req.body

    try{
            if(success==true){

                await  OrderModel.findByIdAndUpdate(orderId,{payment: true})
                return res.status(200).json({ success: true, message: "Paid"});
            }else {
                await  OrderModel.findByIdAndDelete(orderId)
                return res.status(500).json({ success: false, message: "Not Paid"});
            }

    }catch (error){
        return res.status(500).json({success: false, message: " error"})
    }
}


export {placeOrder,verifyOrder}