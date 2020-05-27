import { Entry } from 'shared';
import { NormalizedState, NormalizedPaginationState } from 'interfaces';

export enum EntriesActionTypes {
  FETCH_ENTRIES_STARTED = 'FETCH_ENTRIES_STARTED',
  FETCH_ENTRIES_SUCCESS = 'FETCH_ENTRIES_SUCCESS',
  FETCH_ENTRIES_ERROR = 'FETCH_ENTRIES_ERROR',

  CREATE_ENTRY_STARTED = 'CREATE_ENTRY_STARTED',
  CREATE_ENTRY_SUCCESS = 'CREATE_ENTRY_SUCCESS',
  CREATE_ENTRY_ERROR = 'CREATE_ENTRY_ERROR',

  UPDATED_ENTRY_SUCCESS = 'UPDATED_ENTRY_SUCCESS',
  UPDATED_ENTRY_STARTED = 'UPDATED_ENTRY_STARTED',
  UPDATED_ENTRY_ERROR = 'UPDATED_ENTRY_ERROR',

  DELETE_ENTRY_SUCCESS = 'DELETE_ENTRY_SUCCESS',
  DELETE_ENTRY_STARTED = 'DELETE_ENTRY_STARTED',
  DELETE_ENTRY_ERROR = 'DELETE_ENTRY_ERROR',

  HANDLE_ENTRIES_PAGINATION = 'HANDLE_ENTRIES_PAGINATION',
}

export type EntriesState = NormalizedState<Entry>;

export type EntryListState = NormalizedPaginationState<Entry> & {
  isFetching: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
};
