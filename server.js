import "dotenv/config";
import app from "./app.js";
import {initDatabase} from "./config/db.js";

const PORT = process.env.PORT || 5000;

initDatabase().then(() => {
    console.log("Database connection established");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Database connection failed: ", err);
    process.exit(1);
});