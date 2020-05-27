import { AppStore, PaginationProps } from 'interfaces';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Entry } from 'shared';
import {
  fetchEntries,
  handleEntriesPagination,
  selectEntries,
  selectEntryTablePaginationProps,
  selectLoadingEntryState,
  deleteEntry,
} from 'store/entries';
import EntryList from './EntryList/EntryList';
import history from 'browserHistory';

interface Props {}

const PopulatedEntryList = (_props: Props) => {
  const entries = useSelector(selectEntries);
  const pagination = useSelector(selectEntryTablePaginationProps);
  const totalEntries = useSelector<AppStore>(state => state.ui.entryList.total);
  const loading = useSelector(selectLoadingEntryState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntries());
  }, [pagination, dispatch]);

  const handlePagination = (data: PaginationProps<Entry>) => {
    dispatch(handleEntriesPagination(data));
  };

  const onAdd = () => history.push('/entry');

  const onEdit = (id: string) => history.push(`/entry/${id}`);

  const onDelete = (id: string) => dispatch(deleteEntry(id));

  return (
    <EntryList
      data={entries}
      pagination={{
        ...pagination,
        total: totalEntries as number,
      }}
      onChange={handlePagination}
      loading={loading}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default PopulatedEntryList;
