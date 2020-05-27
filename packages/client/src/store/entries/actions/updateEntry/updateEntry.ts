import { ThunkDispatch } from 'redux-thunk';
import { APIService } from 'services';
import { Entry, EntryDto } from 'shared';
import { EntriesActionTypes } from '../../types';
import history from 'browserHistory';
import { AppStore } from 'interfaces';
import { AnyAction } from 'redux';
import { fetchStatistics } from 'store/statistics';

export const updateEntry = (id: string, data: EntryDto) => async (
  dispatch: ThunkDispatch<AppStore, void, AnyAction>
) => {
  try {
    dispatch({ type: EntriesActionTypes.UPDATED_ENTRY_STARTED });

    await APIService.call<EntryDto, Entry>('patch', `entry/${id}`, null, data);

    dispatch({
      type: EntriesActionTypes.UPDATED_ENTRY_SUCCESS,
    });

    dispatch(fetchStatistics());

    history.push('/');
  } catch (err) {
    dispatch({
      type: EntriesActionTypes.UPDATED_ENTRY_ERROR,
      payload: err.message,
    });
  }
};
