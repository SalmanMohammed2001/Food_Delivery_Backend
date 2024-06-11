import UserModel from "../models/UserModel";

const addToCart = async (req: any, res: any) => {
    try {
        let userData = await UserModel.findOne({_id: req.body.userId})
        let cartData = await userData!.cartData
        if (!cartData[req.body.itemId]) {

            cartData[req.body.itemId] = 1
        } else {
            cartData[req.body.itemId] += 1
        }

        await UserModel.findByIdAndUpdate(req.body.userId, {cartData})
        return res.status(200).json({success: true, message: "Add to card "})
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"})
    }

}

const removeCart = async (req: any, res: any) => {

    try {
        let userData = await UserModel.findById(req.body.userId)
        let cartData = await userData!.cartData
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1
        }
        await UserModel.findByIdAndUpdate(req.body.userId, {cartData})
        return res.status(200).json({success: true, message: "remove form  card "})
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"})
    }

}

const getCart = async (req: any, res: any) => {
    try {
        let userData = await UserModel.findById(req.body.userId)
        let cartData = await userData!.cartData

        return res.status(200).json({success: true, message: "Cart Data",cartData})
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export {addToCart, removeCart, getCart}