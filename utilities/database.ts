import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    try {
        mongoose.set('strictQuery', true)

        if (isConnected) {
            console.log('MongoDB Already Connected')
            return
        }

        const connection = await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: process.env.MONGODB_NAME,
        })
        isConnected = true
        console.log('MongoDB Connected')
        return connection
    } catch (e) {
        console.error('DATABASE ERROR', e)
        return
    }

}