import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { TaskController } from "./controller/TaskController";
var passport = require("./middlewares/init");
const webPush = require("web-push");
const cron = require("node-cron");
const cors = require("cors");
const routerAuth = require("./routes/auth");
const publicVapidKey =
  "BLX6vJKJuAX2Cn4gahTO8wemb16iAYDIr54huYgk2rwWdAOpWvoKCMCE_06LWU4AsUiBZ4e70HzScAkLKpJHRkM";
const privateVapidKey = "6mmgxN3f8JSt8xsrmplBsrq8qznpL_7vtzNi8kOJ8zw";
var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
createConnection()
  .then(async connection => {
    webPush.setVapidDetails(
      "mailto:test@test.com",
      publicVapidKey,
      privateVapidKey
    );
    // create express app

    const app = express();
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use("/auth", routerAuth);
    var task = cron.schedule(
      "* * * * *",
      () => {
        new TaskController().verifyDateToTasks();
      },
      {
        scheduled: false
      }
    );
    task.start();
    app.use(cors(corsOptions));
    app.use("/profile", passport.authenticate("jwt", { session: false }));
    //f
    // register express routes from defined application routes
    Routes.forEach(route => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then(result =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    /////
    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch(error => console.log(error));
