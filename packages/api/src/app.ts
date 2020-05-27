import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { App, Controller } from 'interfaces';
import errorMiddleware from 'middleware/error.middleware';
import contextMiddleware from 'middleware/context.middleware';
import mongoose from 'mongoose';

interface IApp {
  start: () => void;
}

export default class Application implements App {
  private express: express.Application;

  constructor(controllers: Controller[]) {
    this.express = express();

    this.connectToDatabase();
    this.initializeExpressMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandler();
  }

  private connectToDatabase() {
    const {
      MONGO_USERNAME,
      MONGO_PASSWORD,
      MONGO_URL,
      MONGO_DATABASE,
    } = process.env;

    mongoose
      .connect(
        `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DATABASE}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then(() => {
        console.log('Connected to database.');
      })
      .catch(() => {
        console.error('Error connecting to database.');
      });
  }

  private initializeExpressMiddlewares() {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(contextMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.express.use(controller.getPath(), controller.getRouter());
    });
  }

  private initializeErrorHandler() {
    this.express.use(errorMiddleware);
  }

  public start() {
    const port = process.env.PORT || 4000;

    this.express.listen(port, () => {
      console.log(`Listening on ${port}...`);
    });
  }
}
