import { UserController } from "./controller/UserController";
import { TaskController } from "./controller/TaskController";
import { CicleAcademicController } from "./controller/CicleAcademicController";
import { stateTaskController } from "./controller/stateTaskController";
import { SubcriptionController } from "./controller/subcriptionController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},
{
    method: "get",
    route: "/users/:id/cicleAcademics",
    controller: UserController,
    action: "getCicleAcademics"
}, {
    method: "post",
    route: "/cicleAcademic/:idCicleAcademic/tasks/create",
    controller: TaskController,
    action: "createTask"
},
{
    method: "post",
    route: "/cicleAcademic/:idCicleAcademic/tasks/update",
    controller: TaskController,
    action: "updateTask",

},
{
    method: "post",
    route: "/task/updateState",
    controller: TaskController,
    action: "changeStateTask"
},
{
    method: "delete",
    route: "/cicleAcademic/:idCicleAcademic/tasks/:id/delete",
    controller: TaskController,
    action: "deleteTask"
},
{
    method: "get",
    route: "/cicleAcademic/:idCicleAcademic/tasks",
    controller: CicleAcademicController,
    action: "getAllTaskFindCicleAcademic"
},
{
    method: "post",
    route: "/users/:id/cicleAcademics/create",
    controller: CicleAcademicController,
    action: "create"
},
{
    method: "post",
    route: "/users/:id/cicleAcademics/edit",
    controller: CicleAcademicController,
    action: "edit"
},
{
    method: "delete",
    route: "/users/:id/cicleAcademics/:idCicleAcademic/delete",
    controller: CicleAcademicController,
    action: "delete"
},
{
    method: "get",
    route: "/stateTask/all",
    controller: stateTaskController,
    action: "getAll"
}, {
    method: "post",
    route: "/subscription",
    controller: SubcriptionController,
    action: "setSubcription"
},
];