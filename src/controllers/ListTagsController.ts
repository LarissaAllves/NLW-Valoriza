import { Request, Response } from "express";
import { ListUserTagsService } from "../services/ListUserTagsService";

class ListTagsController {
  async handle(request: Request, response: Response) {
    const listTagsService = new ListUserTagsService();

    const tags = await listTagsService.execute();

    return response.json(tags);
  }
}

export { ListTagsController };
