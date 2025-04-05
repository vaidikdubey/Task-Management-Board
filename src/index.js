import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/db.connect.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

//Since this is a promise we can use .then() and .catch() methods here
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error. ", err);
    process.exit(1);
  });
