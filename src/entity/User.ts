import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CicleAcademic } from "./CicleAcademic";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    email: string;
    @Column()
    name: string;
    @Column()
    password: string
    @OneToMany(type => CicleAcademic, cicleAcademic => cicleAcademic.user)
    cicleAcademics: CicleAcademic[]
    @Column({ type: Boolean, default: true })
    status: boolean
}
