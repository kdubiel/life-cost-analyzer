import * as yup from 'yup';
import { EntryDto } from './entry.dto';

export const entryYupSchema: yup.ObjectSchema<EntryDto> = yup
  .object({
    date: yup.date().required(),
    category: yup.string().min(3).max(64).required(),
    value: yup.number().min(0.01).max(999999).required(),
    description: yup.string().max(256),
  })
  .defined();
