// index.ts
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import userRoutes from "./route/userRoute";
import { createConnection } from "typeorm";
import connectionOptions from "./typeorm.config";

const app = express();

app.use(bodyParser.json());

app.use("/users", userRoutes);

app.use(
  (
    err: any,
    req: Request,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

createConnection(connectionOptions)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
