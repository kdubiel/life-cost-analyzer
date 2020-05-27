import { IRouter, Request, Response, Router, NextFunction } from 'express';
import { Controller } from 'interfaces';
import entryModel from 'models/entry.model';
import HttpException from 'models/HttpException';

export class StatisticController implements Controller {
  private path = '/statistics';
  private router: IRouter = Router();

  constructor() {
    this.initializeRoutes();
  }

  getRouter(): IRouter {
    return this.router;
  }

  getPath(): string {
    return this.path;
  }

  private initializeRoutes() {
    this.router.get('/', this.getStatistics);
  }

  private getStatistics = async (req: Request, res: Response) => {
    const sumValuesByCategories = await entryModel.aggregate([
      {
        $group: {
          _id: '$category',
          sum: {
            $sum: '$value',
          },
        },
      },
    ]);

    res.send(sumValuesByCategories);
  };
}
