"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"
import connectDB from "@/db/connectdb"


export const initiate = async (amount, to_username, paymentform) => {

    try {

        await connectDB()
        const user = await User.findOne({
            username: to_username
        }).lean()
        if (!user) {
            throw new Error("User not found")
        }

        if (!user.razorpayid) {
            throw new Error("Razorpay ID missing")
        }

        if (!user.razorpaysecret) {
            throw new Error("Razorpay Secret missing")
        }

        const instance = new Razorpay({

            key_id: user.razorpayid,

            key_secret: user.razorpaysecret,
        })

        const options = {

            amount: Number(amount) * 100,

            currency: "INR",

            receipt: `receipt_${Date.now()}`
        }

        const order = await instance.orders.create(options)

        await Payment.create({

            oid: order.id,

            amount: Number(amount),

            to_user: to_username,

            name: paymentform.name || "Anonymous",

            message: paymentform.message || "Support",

            done: false,
        })

        return JSON.parse(JSON.stringify(order))

    }

    catch (error) {

        throw new Error(error.error?.description || error.message)
    }
}
export const fetchuser = async (username) => {

    await connectDB()

    const u = await User.findOne({
        username: username
    }).lean()

    return JSON.parse(JSON.stringify(u))
}

export const fetchpayments = async (username) => {

    await connectDB()

    const p = await Payment.find({
        to_user: username,
        done: true
    }).sort({ amount: -1 }).lean()

    return JSON.parse(JSON.stringify(p))
}

export const updateprofile = async (data, oldusername) => {

    await connectDB()

    // Check if username changed
    if (oldusername !== data.username) {

        // Update all old payments
        await Payment.updateMany(
            {
                to_user: oldusername
            },
            {
                to_user: data.username
            }
        )
    }

    // Update user profile
    await User.findOneAndUpdate(
        {
            username: oldusername
        },
        {
            name: data.name,
            email: data.email,
            username: data.username,
            profilepic: data.profilepic,
            coverpic: data.coverpic,
            razorpayid: data.razorpayid,
            razorpaysecret: data.razorpaysecret,
        },
        {
            new: true
        }
    )
}