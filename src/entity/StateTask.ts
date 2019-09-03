import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { stateTaskEnum } from "../enum/enumStatetask";
import { Task } from "./Task";
@Entity()
export class StateTask {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: "enum", enum: stateTaskEnum, default: stateTaskEnum.pendiente })
    name: stateTaskEnum
    @Column({ default: true, type: "boolean" })
    status: boolean
    @Column({ type: "varchar" })
    color: string
    @OneToMany(type => Task, task => task.stateTask)
    tasks: Task[]

}