import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CicleAcademic } from "./CicleAcademic";
import { StateTask } from "./StateTask";
@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    content: string
    @Column({ type: "datetime" })
    endDate: Date
    @Column({ type: "boolean", default: true })
    status: boolean
    @ManyToOne(type => CicleAcademic, cicleAcademic => cicleAcademic.tasks)
    cicleAcademic: CicleAcademic
    @ManyToOne(type => StateTask, stateTask => stateTask.tasks, { eager: true })
    stateTask: StateTask
    constructor(title: string, content: string, endDate: Date) {
        this.title = title;
        this.content = content;
        this.endDate = endDate;
    }
}

