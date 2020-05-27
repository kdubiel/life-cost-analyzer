import { APIService } from 'services';
import { Entry, EntryDto } from 'shared';
import { fetchEntries } from '../../';
import { EntriesActionTypes } from '../../types';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AppStore } from 'interfaces';
import { fetchStatistics } from 'store/statistics';

export const deleteEntry = (id: string) => async (
  dispatch: ThunkDispatch<AppStore, void, AnyAction>
) => {
  try {
    dispatch({ type: EntriesActionTypes.DELETE_ENTRY_STARTED });

    await APIService.call<EntryDto, Entry>('delete', `entry/${id}`);

    dispatch({
      type: EntriesActionTypes.DELETE_ENTRY_SUCCESS,
    });

    dispatch(fetchEntries());
    dispatch(fetchStatistics());
  } catch (err) {
    dispatch({
      type: EntriesActionTypes.DELETE_ENTRY_ERROR,
      payload: err.message,
    });
  }
};
