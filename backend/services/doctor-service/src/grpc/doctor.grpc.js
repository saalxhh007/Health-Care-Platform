import path from "path";
import protoLoader from "@grpc/proto-loader"
import grpc from "@grpc/grpc-js"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
const PROTO_PATH = path.join(dirname, "../../../../gateway/proto/doctor.proto");

const packageDefinitions = protoLoader.loadSync(PROTO_PATH);
const doctorProto = grpc.loadPackageDefinition(packageDefinitions).doctor;

let doctorAvailability = {};
const streamDoctorAvailability = (call) => {
    call.on("data", (request) => {
            doctorAvailability[request.doctorId] = request.isAvailable;
            call.write({
                doctorId: request.doctorId,
                isAvailable: request.isAvailable,
                message: `Doctor Availability Is Set To ${request.isAvailable ? "Available" : "Not Available"}`
            });
            console.log(`Doctor Availability Is Set To ${request.isAvailable ? "Available" : "Not Available"}`);
    });

    call.on("end", () => {
        console.log("Client Stopped Streaming");
        call.end();
    });
}

export const server = new grpc.Server();
server.addService(doctorProto.DoctorService.service, { streamDoctorAvailability });

server.bindAsync("0.0.0.0:50052", grpc.ServerCredentials.createInsecure(), () => {
    console.log("Doctor Service running 50052");
});

