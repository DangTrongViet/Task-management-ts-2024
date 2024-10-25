import { Router } from "express";

import * as controller from "../controllers/user.controller";

import * as middlewareAuth from "../middlewares/auth.middleware";
const route: Router = Router();

route.post("/register",controller.register);

route.get("/login",controller.login);

route.get("/detail",middlewareAuth.requireAuth,controller.detail);

export const userRoutes: Router = route;