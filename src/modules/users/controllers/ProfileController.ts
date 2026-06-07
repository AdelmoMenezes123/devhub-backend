import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowProfileService } from "../services/ShowProfileService";

export class ProfileController {
  async show(req: Request, res: Response) {
    const userId = req.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute(userId);

    return res.json(user);
  }
}
