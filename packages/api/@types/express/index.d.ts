// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Context } from 'interfaces';

declare global {
  namespace Express {
    interface Request {
      context: Context;
    }
  }
}

export {};
