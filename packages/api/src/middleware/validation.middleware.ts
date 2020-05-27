import { ObjectSchema } from 'shared';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import HttpException from 'models/HttpException';

const validationMiddleware = <P extends {}>(
  yupSchema: ObjectSchema<P>
): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
  yupSchema
    .validate(req.body)
    .then(() => {
      next();
    })
    .catch(error => {
      const message = 'Validation error.';
      next(new HttpException(422, message));
    });
};

export default validationMiddleware;
