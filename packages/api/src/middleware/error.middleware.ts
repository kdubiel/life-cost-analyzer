import { Request, Response, NextFunction } from 'express';
import HttpException from 'models/HttpException';

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { status, message } = error;

  res.status(status).send({
    message,
    status,
  });
};

export default errorMiddleware;
