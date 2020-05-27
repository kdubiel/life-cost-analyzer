import { IRouter } from 'express';

export interface Controller {
  getRouter(): IRouter;
  getPath(): string;
}
