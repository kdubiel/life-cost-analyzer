import { ThunkDispatch } from 'redux-thunk';
import { APIService } from 'services';
import { Entry, EntryDto } from 'shared';
import { EntriesActionTypes } from '../../';
import { fetchStatistics } from 'store/statistics';
import history from 'browserHistory';
import { AppStore } from 'interfaces';
import { AnyAction } from 'redux';

export const createEntry = (newEntry: EntryDto) => async (
  dispatch: ThunkDispatch<AppStore, void, AnyAction>
) => {
  try {
    dispatch({ type: EntriesActionTypes.CREATE_ENTRY_STARTED });

    await APIService.call<EntryDto, Entry>('post', 'entry/', null, newEntry);

    dispatch({
      type: EntriesActionTypes.CREATE_ENTRY_SUCCESS,
    });

    dispatch(fetchStatistics());

    history.push('/');
  } catch (err) {
    dispatch({
      type: EntriesActionTypes.CREATE_ENTRY_ERROR,
      payload: err.message,
    });
  }
};
