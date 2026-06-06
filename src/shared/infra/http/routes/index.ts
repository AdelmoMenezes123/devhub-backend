import { Router } from "express";
import { usersRoutes } from "../../../../modules/users/routes/users.routes";

const routes = Router();

routes.get("/health", async (_, response) => {
  return response.json({
    status: "ok",
  });
});

routes.use("/users", usersRoutes);

export { routes };
