import mongoose from "mongoose";

class Database {
  private readonly DB_URI: string;

  constructor() {
    this.DB_URI = "mongodb://localhost:27017/banOto360";
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.DB_URI);
      console.log("✅MongoDB connected successfully!");
    } catch (error) {
      console.error("❌MongoDB connection error:", error);
    }
  }
}
export default new Database();
