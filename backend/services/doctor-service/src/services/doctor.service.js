import { Doctor } from "../models/doctor.module.js";

class DoctorService {
    async createDoctor({first_name, last_name, cabinet_location, specialization, experience, availabalite}) {        
        try {
            return await Doctor.create({
                first_name,
                last_name,
                cabinet_location,
                specialization,
                experience,
                availabalite
            });
        }
        catch {
            return { error: "Failed to create doctor Sevice" };
        }
    }
    
    async deleteDoctor(id) {
        try {
            return await doctor.destroy({where: { id } });
        }
        catch {
        }
    }
    
    async updateDoctor(id, data) {
        try {
            await doctor.update(data, {where: { id }});
            return await Doctor.findByPk(id);
        }
        catch {

        }
    }

    async getDoctorById(id) {
        try {
            return await Doctor.findByPk(id);
        }
        catch {
            return { error: "Failed to get doctor" };
        }
    }

    async getAllDoctors() {
        try {
            return await Doctor.findAll();
        }
        catch {

        }
    }
}

export default new DoctorService();