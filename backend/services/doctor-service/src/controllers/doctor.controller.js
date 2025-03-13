import express from "express";
import DoctorService from "../services/doctor.service.js";

const doctorRouter = express.Router();

doctorRouter.post("/create", async (req, res) => {
    const doctor = await DoctorService.createDoctor(req.body);
    res.status(201).json(doctor);
});

doctorRouter.post("/delete/:id", async (req, res) => {
    await DoctorService.deleteDoctor(req.params.id);
    res.status(201).json({ message: "delete success" });
})

doctorRouter.post("/update", async (req, res) => {
    const doctor = await DoctorService.updateDoctor(req.body);
    res.status(201).json(doctor);
});

doctorRouter.get("/:id", async (req, res) => {
    const doctor = await DoctorService.getDoctorById(req.params.id);
    res.status(201).json(doctor);
});

doctorRouter.get("/get/all", async (req, res) => {
    const doctors = await DoctorService.getAllDoctors();
    res.status(201).json(doctors);
});

export default doctorRouter;