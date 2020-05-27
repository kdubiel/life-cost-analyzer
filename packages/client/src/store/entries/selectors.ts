import { AppStore, PaginationProps } from 'interfaces';
import { values } from 'lodash';
import { createSelector, Selector } from 'reselect';
import { Entry } from 'shared';

const getEntriesArray: Selector<AppStore, Entry[]> = state => {
  const {
    entities: {
      entry: { byId },
    },
  } = state;

  return values(byId);
};

const getDirection: Selector<AppStore, 'ascend' | 'descend' | null> = state =>
  state.ui.entryList.direction;

const getLimit: Selector<AppStore, number> = state => state.ui.entryList.limit;

const getPage: Selector<AppStore, number> = state => state.ui.entryList.page;

const getSortBy: Selector<AppStore, keyof Entry> = state =>
  state.ui.entryList.sortBy;

const getIsFetching: Selector<AppStore, boolean> = state =>
  state.ui.entryList.isFetching;

const getIsUpdating: Selector<AppStore, boolean> = state =>
  state.ui.entryList.isUpdating;

const getIsDeleting: Selector<AppStore, boolean> = state =>
  state.ui.entryList.isDeleting;

export const selectEntries = createSelector([getEntriesArray], entries => {
  return entries;
});

export const selectEntryTablePaginationProps = createSelector(
  [getDirection, getLimit, getPage, getSortBy],
  (direction, limit, page, sortBy) => {
    const props: Omit<PaginationProps<Entry>, 'total'> = {
      current: page + 1,
      pageSize: limit,
      sortField: sortBy,
      sortOrder: direction,
    };

    return props;
  }
);

export const selectLoadingEntryState = createSelector(
  [getIsFetching, getIsUpdating, getIsDeleting],
  (fetching, updating, deleting) => fetching || updating || deleting
);
