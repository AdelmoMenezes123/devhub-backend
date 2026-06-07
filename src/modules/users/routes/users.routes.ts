import { Router } from "express";
import { EnsureAuthenticated } from "../../../shared/infra/http/middlewares/EnsureAuthenticated";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { ProfileController } from "../controllers/ProfileController";
import { UsersController } from "../controllers/UsersController";

const usersRoutes = Router();

const usersController = new UsersController();
const authenticateUserController = new AuthenticateUserController();
const ensureAutenticated = new EnsureAuthenticated();
const profileController = new ProfileController();

usersRoutes.post("/", usersController.create);

usersRoutes.post("/sessions", authenticateUserController.create);

usersRoutes.get("/profile", ensureAutenticated.execute, profileController.show);

export { usersRoutes };
