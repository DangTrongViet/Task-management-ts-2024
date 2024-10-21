import { Router, Response, Request } from "express";
const route : Router=Router();

import Task from "../models/task.model";
import * as controller from "../controllers/task.controller";

route.get("/", controller.index);

route.get("/detail/:id",controller.detail);

export const taskRoutes: Router = route;