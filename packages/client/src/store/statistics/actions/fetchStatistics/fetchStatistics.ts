import { ThunkDispatch } from 'redux-thunk';
import { APIService } from 'services';
import { CategoryStatistic, StatisticsActionTypes } from '../../types';
import { AppStore } from 'interfaces';
import { AnyAction } from 'redux';

export const fetchStatistics = () => async (
  dispatch: ThunkDispatch<AppStore, void, AnyAction>
) => {
  dispatch({ type: StatisticsActionTypes.FETCH_STATISTICS_STARTED });

  try {
    const data = await APIService.call<{}, CategoryStatistic[]>(
      'get',
      'statistics/'
    );

    dispatch({
      type: StatisticsActionTypes.FETCH_STATISTICS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    return dispatch({
      type: StatisticsActionTypes.FETCH_STATISTICS_ERROR,
      payload: err.message,
    });
  }
};
