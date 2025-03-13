import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    lastName?: string;

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: true })
    phoneNumber?: string;

    @Column({ nullable: true })
    address?: string;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    state?: string;

    @Column({ nullable: true })
    role: string;
}
export default User