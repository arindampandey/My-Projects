import mongoose from "mongoose";

const connectDB = async () => {

    if (mongoose.connections[0].readyState) {
        return;
    }

    try {

        const conn = await mongoose.connect(
            "mongodb://127.0.0.1:27017/getmeacoffee"
        );

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    }

    catch (error) {

        console.log(error);

    }
};

export default connectDB;