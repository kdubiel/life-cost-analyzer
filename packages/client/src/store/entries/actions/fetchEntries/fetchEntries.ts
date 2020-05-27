import { AppStore } from 'interfaces';
import { normalize } from 'normalizr';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { APIService } from 'services';
import { Entry, PaginatedResponseData, PaginationRequestParams } from 'shared';
import { entrySchema } from '../../schema';
import { EntriesActionTypes } from '../../types';

export const fetchEntries = () => async (
  dispatch: ThunkDispatch<AppStore, void, AnyAction>,
  getState: () => AppStore
) => {
  dispatch({ type: EntriesActionTypes.FETCH_ENTRIES_STARTED });

  const {
    ui: {
      entryList: { direction, limit, page, sortBy },
    },
  } = getState();

  try {
    const { data, metadata } = await APIService.call<
      PaginationRequestParams<Entry>,
      PaginatedResponseData<Entry>
    >('get', 'entry/', {
      direction,
      limit: limit.toString(),
      page: page.toString(),
      sortBy,
    });

    const {
      entities: { entry },
      result: allIds,
    } = normalize<Entry>(data, [entrySchema]);

    dispatch({
      type: EntriesActionTypes.FETCH_ENTRIES_SUCCESS,
      payload: {
        entries: {
          byId: entry || {},
          allIds,
        },
        metadata: metadata || {},
      },
    });
  } catch (err) {
    dispatch({
      type: EntriesActionTypes.FETCH_ENTRIES_ERROR,
      payload: err.message,
    });
  }
};
