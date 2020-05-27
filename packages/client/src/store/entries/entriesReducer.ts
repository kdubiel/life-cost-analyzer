import { Reducer } from 'redux';
import { EntriesActionTypes, EntriesState, EntryListState } from './types';
import { toast } from 'react-toastify';

const initialEntriesState: EntriesState = {
  byId: {},
  allIds: [],
};

export const entriesReducer: Reducer<EntriesState> = (
  state = initialEntriesState,
  action
) => {
  switch (action.type) {
    case EntriesActionTypes.FETCH_ENTRIES_SUCCESS: {
      return {
        ...state,
        ...action.payload.entries,
      };
    }
    case EntriesActionTypes.FETCH_ENTRIES_ERROR: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

const initialEntryListState: EntryListState = {
  total: 0,
  page: 0,
  limit: 2,
  sortBy: 'value',
  direction: 'ascend',
  isFetching: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
};

export const entryListReducer: Reducer<EntryListState> = (
  state = initialEntryListState,
  action
) => {
  switch (action.type) {
    case EntriesActionTypes.HANDLE_ENTRIES_PAGINATION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case EntriesActionTypes.FETCH_ENTRIES_STARTED: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case EntriesActionTypes.FETCH_ENTRIES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        total: action.payload.metadata.total,
        page:
          state.page * state.limit >= action.payload.metadata.total &&
          state.page > 0
            ? state.page - 1
            : state.page,
      };
    }
    case EntriesActionTypes.FETCH_ENTRIES_ERROR: {
      toast.error(action.payload);
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }
    case EntriesActionTypes.CREATE_ENTRY_STARTED: {
      return {
        ...state,
        isUpdating: true,
      };
    }
    case EntriesActionTypes.CREATE_ENTRY_SUCCESS: {
      return {
        ...state,
        isUpdating: false,
      };
    }
    case EntriesActionTypes.CREATE_ENTRY_ERROR: {
      toast.error(action.payload);
      return {
        ...state,
        isUpdating: false,
        error: action.payload,
      };
    }
    case EntriesActionTypes.DELETE_ENTRY_STARTED: {
      return {
        ...state,
        isDeleting: true,
      };
    }
    case EntriesActionTypes.DELETE_ENTRY_ERROR: {
      toast.error(action.payload);
      return {
        ...state,
        isDeleting: false,
        error: action.payload,
      };
    }
    case EntriesActionTypes.DELETE_ENTRY_SUCCESS: {
      return {
        ...state,
        isDeleting: false,
      };
    }
    default: {
      return state;
    }
  }
};
