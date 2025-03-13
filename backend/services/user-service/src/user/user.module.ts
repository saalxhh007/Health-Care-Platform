import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: "DOCTOR_SERVICE",
        transport: Transport.GRPC,
        options: {
          url: "localhost:50051",
          package: "doctor",
          protoPath: join(__dirname, "./../../../../gateway/proto/doctor.proto")
        }
      }
    ])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
