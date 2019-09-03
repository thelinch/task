import { getCustomRepository, Raw, Not } from "typeorm";
import { Request, Response } from "express";
import { taskRepository } from "../repositories/taskRepository";
import { CicleAcademicRepository } from "../repositories/cicleAcademicRepository";
import { Task } from "../entity/Task";
import { stateTaskRepository } from "../repositories/stateTaskRepository";
import { stateTaskEnum } from "../enum/enumStatetask";
import { isNull, isUndefined } from "util";
import { notEqual } from "assert";
import { getConnection } from "typeorm";
export class TaskController {
    private taskRepository = getCustomRepository(taskRepository);
    private cicleAcademicRepository = getCustomRepository(CicleAcademicRepository)
    private stateTaskRepository = getCustomRepository(stateTaskRepository);

    async createTask(req: Request, res: Response) {
        const { idCicleAcademic, task } = req.body
        const taskCreate = new Task(task.title, task.content ? task.content : "SIN CONTENIDO", task.endDate);
        taskCreate.cicleAcademic = await this.cicleAcademicRepository.findOne(idCicleAcademic);
        taskCreate.stateTask = await this.stateTaskRepository.getStateTaskFindEnum(stateTaskEnum.pendiente);
        await this.cicleAcademicRepository.increment({ id: idCicleAcademic }, "pendiente", 1);
        return this.taskRepository.save(taskCreate);
    }
    async updateTask(req: Request, res: Response) {
        const { id, title, content, endDate } = req.body
        const taskCreate = await this.taskRepository.findOne(id);
        taskCreate.content = content ? content : "SIN CONTENIDO";
        taskCreate.title = title;
        taskCreate.endDate = endDate;
        return this.taskRepository.save(taskCreate);
    }
    async verifyDateToTasks() {
        let stateTaskNotCompleted = await this.stateTaskRepository.getStateTaskFindEnum(stateTaskEnum.nocompletado);

        let tasks = await this.taskRepository.find({
            endDate: Raw(alias => `${alias} < NOW()`),
            stateTask: { id: Not(stateTaskNotCompleted.id) }
        });
        tasks.forEach(async task => {
            task.stateTask = stateTaskNotCompleted;
            await this.taskRepository.save(task);
        });

    }
    async deleteTask(req: Request, res: Response) {
        const { id } = req.params
        const taskSearch = await this.taskRepository.findOne({ where: { id: id }, relations: ["cicleAcademic"] });
        taskSearch.status = false;
        await this.cicleAcademicRepository.decrement({ id: taskSearch.cicleAcademic.id }, taskSearch.stateTask.name.replace(/ /g, ""), 1);
        return this.taskRepository.save(taskSearch);
    }
    async changeStateTask(req: Request, res: Response) {
        const { idTask, stateTask } = req.body
        let taskUpdate = await this.taskRepository.findOne({ where: { id: idTask }, relations: ["stateTask", "cicleAcademic"] });
        if (!isUndefined(stateTaskEnum[stateTask.name.replace(/ /g, "")])) {
            await this.cicleAcademicRepository.decrement({ id: taskUpdate.cicleAcademic.id }, taskUpdate.stateTask.name.replace(/ /g, ""), 1);

            await this.cicleAcademicRepository.increment({ id: taskUpdate.cicleAcademic.id }, stateTask.name.replace(/ /g, ""), 1)
            taskUpdate.stateTask = stateTask;
            return this.taskRepository.save(taskUpdate);
        }
        res.status(500).json({ message: "Ups! ha ocurrido un problema" });
    }

}
