import { Reducer } from 'redux';
import { StatisticsState, StatisticsActionTypes } from './types';
import { sumBy } from 'lodash';
import { toast } from 'react-toastify';

const initialStatisticsState: StatisticsState = {
  categories: [],
  totalValue: 0,
};

export const statisticsReducer: Reducer<StatisticsState> = (
  state = initialStatisticsState,
  action
) => {
  switch (action.type) {
    case StatisticsActionTypes.FETCH_STATISTICS_STARTED: {
      return {
        ...state,
      };
    }
    case StatisticsActionTypes.FETCH_STATISTICS_SUCCESS: {
      return {
        ...state,
        categories: action.payload,
        totalValue: sumBy(action.payload, 'sum'),
      };
    }
    case StatisticsActionTypes.FETCH_STATISTICS_ERROR: {
      toast.error(action.payload);
      return {
        ...state,
        statistics: [],
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
