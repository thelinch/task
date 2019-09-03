const cron = require('node-cron');
import { TaskController } from "../controller/TaskController";

export class job {

    constructor() {

    }
    verifyToTasks() {
        var task = cron.schedule('* * * * *', () => {
        
        }, {
                scheduled: false
            });

        task.start();
    }
}