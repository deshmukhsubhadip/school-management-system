import app from "./index.js";
import database from "./connectDB/mongoose.js";



database();

app.listen(process.env.PORT, () => {
    console.log(`Server is working on port: ${process.env.PORT} ON ${process.env.NODE_ENV}. Subhadip the link is: http://localhost:${process.env.PORT}`);
});
