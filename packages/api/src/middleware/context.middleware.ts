import { Request, Response, NextFunction } from 'express';
import { Context } from 'interfaces';
import { PaginationRequestParams } from 'shared';

const contextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {
    sortBy = 'value',
    direction = 'ascend',
    page,
    limit,
  } = req.query as Partial<PaginationRequestParams<Object>>;

  const parsedLimit = limit ? parseInt(limit, 10) : 2;
  const parsedPage = page ? parseInt(page, 10) : 0;

  const context: Context = {
    skip: parsedPage * parsedLimit,
    limit: parsedLimit,
    sortBy: `${direction === 'ascend' ? '' : '-'}${sortBy}`,
  };

  req.context = context;

  next();
};

export default contextMiddleware;
