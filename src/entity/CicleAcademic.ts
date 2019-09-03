import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Task } from "./Task";
@Entity()
export class CicleAcademic {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @UpdateDateColumn()
    updatedAt: Date
    @Column({ default: 0 })
    completado: number
    @Column({ default: 0 })
    pendiente: number
    @Column({ default: 0 })
    nocompletado: number
    @Column({ type: "boolean", default: true })
    status: boolean
    @ManyToOne(type => User, user => user.cicleAcademics)
    user: User
    @OneToMany(type => Task, task => task.cicleAcademic)
    tasks: Task[]
}