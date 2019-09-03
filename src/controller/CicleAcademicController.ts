import { CicleAcademic } from './../entity/CicleAcademic';
import { getCustomRepository, Raw } from "typeorm";
import { Request, Response } from "express";
import { CicleAcademicRepository } from "../repositories/cicleAcademicRepository";
import { UserRepository } from "../repositories/userRepository";
export class CicleAcademicController {
    private cicleAcademicRepository = getCustomRepository(CicleAcademicRepository)
    private userRepository = getCustomRepository(UserRepository);
    async getAllTaskFindCicleAcademic(req: Request, res: Response) {
        const { idCicleAcademic } = req.params

        const data = await this.cicleAcademicRepository.findOne({
            where: [{ id: idCicleAcademic }], relations: ["tasks"]
        })
        data.tasks = data.tasks.filter(task => task.status)

        return data.tasks;

    }
    async create(req: Request, res: Response) {
        const { idClient, name } = req.body;
        let cicleAcademicNew = new CicleAcademic();
        cicleAcademicNew.name = name;
        cicleAcademicNew.user = await this.userRepository.findOne(idClient);
        return this.cicleAcademicRepository.save(cicleAcademicNew);

    }
    async delete(req: Request) {
        const { idCicleAcademic } = req.params
        let cicleAcademicUpdate = await this.cicleAcademicRepository.findOne(idCicleAcademic);
        cicleAcademicUpdate.status = false;
        return this.cicleAcademicRepository.save(cicleAcademicUpdate);
    }
    async edit(req: Request) {
        let cicleAcademicRequest = req.body;
        let cicleAcademic = await this.cicleAcademicRepository.findOne({ where: { id: cicleAcademicRequest.id } });
        cicleAcademic.name = cicleAcademicRequest.name;
        return this.cicleAcademicRepository.save(cicleAcademic);
    }

}