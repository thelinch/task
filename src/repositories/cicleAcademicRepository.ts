import { EntityRepository, Repository } from "typeorm"
import { CicleAcademic } from "../entity/CicleAcademic";

@EntityRepository(CicleAcademic)
export class CicleAcademicRepository extends Repository<CicleAcademic>{
    
}