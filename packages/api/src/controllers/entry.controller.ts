import { IRouter, NextFunction, Request, Response, Router } from 'express';
import { Controller } from 'interfaces';
import validationMiddleware from 'middleware/validation.middleware';
import HttpException from 'models/HttpException';
import { EntryDto, entryYupSchema } from 'shared';
import entryModel from 'models/entry.model';

export class EntryController implements Controller {
  private path = '/entry';
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
    this.router
      .get('/', this.getEntries)
      .get(`/:id`, this.getEntryById)
      .post(
        `/`,
        validationMiddleware<EntryDto>(entryYupSchema),
        this.createEntry
      )
      .patch(
        `/:id`,
        validationMiddleware<EntryDto>(entryYupSchema),
        this.updateEntry
      )
      .delete(`/:id`, this.deleteEntry);
  }

  private getEntries = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { skip, limit, sortBy } = req.context;

      const entries = await entryModel
        .find()
        .sort(sortBy)
        .skip(skip)
        .limit(limit);

      const total = await entryModel.countDocuments({});

      const metadata = {
        total,
      };

      res.send({ data: entries, metadata, success: true, error: null });
    } catch (e) {
      next(new HttpException(500));
    }
  };

  private getEntryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;

      const entry = await entryModel.findById(id);

      if (entry) {
        res.send(entry);
      } else {
        next(new HttpException(404));
      }
    } catch (e) {
      next(new HttpException(500));
    }
  };

  private createEntry = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const entryData: EntryDto = req.body;

      const newEntry = await new entryModel(entryData).save();
      res.send(newEntry);
    } catch (e) {
      next(new HttpException(500));
    }
  };

  private updateEntry = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const entryData = req.body;

      const updatedEntry = await entryModel.findByIdAndUpdate(id, entryData, {
        new: true,
      });

      if (updatedEntry) {
        res.send(updatedEntry);
      } else {
        next(new HttpException(404));
      }
    } catch (e) {
      next(new HttpException(500));
    }
  };

  private deleteEntry = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;

      const result = await entryModel.findByIdAndDelete(id);

      if (result) {
        res.send(200);
      } else {
        next(new HttpException(404));
      }
    } catch (e) {
      next(new HttpException(500));
    }
  };
}
