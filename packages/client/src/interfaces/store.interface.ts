import { RouterState } from 'connected-react-router';
import { EntriesState, EntryListState } from 'store/entries';
import { StatisticsState } from 'store/statistics/types';

export interface AppStore {
  readonly router: RouterState;
  readonly entities: {
    readonly entry: EntriesState;
  };
  readonly ui: {
    entryList: EntryListState;
  };
  readonly statistics: StatisticsState;
}

export interface NormalizedState<T> {
  byId: {
    [key: string]: T;
  };
  allIds: string[];
}

export interface NormalizedPaginationState<T> {
  page: number;
  limit: number;
  sortBy: keyof T;
  direction: 'ascend' | 'descend' | null;
  total: number;
}
