import { Router } from "express";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { UsersController } from "../controllers/UsersController";

const usersRoutes = Router();

const usersController = new UsersController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post("/", usersController.create);

usersRoutes.post("/sessions", authenticateUserController.create);

export { usersRoutes };
