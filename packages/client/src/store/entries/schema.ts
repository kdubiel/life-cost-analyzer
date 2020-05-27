import { schema } from 'normalizr';

export const entrySchema = new schema.Entity('entry', {}, { idAttribute: '_id' });
