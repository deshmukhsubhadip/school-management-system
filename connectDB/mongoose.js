import mongoose from "mongoose";


const database = () => {
    mongoose.connect(process.env.Mongo_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Database Connected");
    }).catch((error) => {
        console.log("Error occurs", error);
    });
};

export default database;