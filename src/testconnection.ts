import { db } from "./config/mysql";

const testConnection = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM artists");
    console.log("Connection works!");
    console.log(rows);
  } catch (error) {
    console.error("Connection failed:", error);
  }
};

testConnection();