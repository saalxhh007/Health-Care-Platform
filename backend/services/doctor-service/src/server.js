import express from "express";
import doctorRouter from "./controllers/doctor.controller.js";
import { sequelize } from "./db/db.js";
import "./grpc/doctor.grpc.js";
const app = express();

app.use(express.json());

// Doctor Routes
app.use("/doctor", doctorRouter);
sequelize.sync().then(() => {
    app.listen(50052, () => console.log(`Doctor Service Db Running On 50052`));
});
