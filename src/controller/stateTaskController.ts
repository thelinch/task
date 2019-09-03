import { getCustomRepository, Raw } from "typeorm";
import { Request, Response } from "express";
import { stateTaskRepository } from "../repositories/stateTaskRepository";
export class stateTaskController {
    private stateTaskRepository = getCustomRepository(stateTaskRepository);

    async getAll() {
        return await this.stateTaskRepository.find();
    }

}