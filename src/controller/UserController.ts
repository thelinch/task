import { getRepository, getCustomRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { UserRepository } from "../repositories/userRepository";

export class UserController {

    private userRepository = getCustomRepository(UserRepository);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const userSearch = await this.userRepository.findOne({ where: { id: request.params.id }, relations: ["cicleAcademics"] });
        return userSearch.cicleAcademics
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }
    async getCicleAcademics(req: Request, res: Response) {
        const { id } = req.params
        const user = await this.userRepository.findOne({ where: { id: id }, relations: ["cicleAcademics"] })
        user.cicleAcademics = user.cicleAcademics.filter(cicleAcademic => cicleAcademic.status);
        return user.cicleAcademics;
    }
    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}