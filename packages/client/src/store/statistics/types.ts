export enum StatisticsActionTypes {
  FETCH_STATISTICS_STARTED = 'FETCH_STATISTICS_STARTED',
  FETCH_STATISTICS_SUCCESS = 'FETCH_STATISTICS_SUCCESS',
  FETCH_STATISTICS_ERROR = 'FETCH_STATISTICS_ERROR',
}

export interface CategoryStatistic {
  _id: string;
  sum: number;
}

export type StatisticsState = {
  categories: CategoryStatistic[];
  totalValue: number;
};
