import { EntityRepository, Repository } from "typeorm";
import { StateTask } from "../entity/StateTask";
import { stateTaskEnum } from "../enum/enumStatetask";
@EntityRepository(StateTask)
export class stateTaskRepository extends Repository<StateTask>{
    getStateTaskFindEnum(enumTask: stateTaskEnum) {
        return this.findOne({ name: enumTask });
    }
}