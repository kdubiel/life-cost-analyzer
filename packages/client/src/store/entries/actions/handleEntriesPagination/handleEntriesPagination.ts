import {
  NormalizedPaginationState,
  PaginationProps,
  AppStore,
} from 'interfaces';
import { ThunkDispatch } from 'redux-thunk';
import { Entry } from 'shared';
import { EntriesActionTypes } from '../../types';
import { AnyAction } from 'redux';

export const handleEntriesPagination = (
  paginationProps: PaginationProps<Entry>
) => async (dispatch: ThunkDispatch<AppStore, void, AnyAction>) => {
  const { current, pageSize, sortOrder, sortField } = paginationProps;

  const mappedProps: Omit<NormalizedPaginationState<Entry>, 'total'> = {
    direction: sortOrder,
    limit: pageSize,
    page: current - 1,
    sortBy: sortOrder ? sortField : '_id',
  };

  dispatch({
    type: EntriesActionTypes.HANDLE_ENTRIES_PAGINATION,
    payload: mappedProps,
  });
};
