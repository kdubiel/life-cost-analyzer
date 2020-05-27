import { Space, Table } from 'antd';
import {
  ColumnsType,
  SorterResult,
  TablePaginationConfig,
} from 'antd/lib/table/interface';
import { Button } from 'components';
import { PaginationProps } from 'interfaces';
import moment from 'moment';
import React from 'react';
import { Entry } from 'shared';

interface Props {
  data: Entry[];
  pagination: PaginationProps<Entry>;
  loading?: boolean;
  onChange(data: Omit<PaginationProps<Entry>, 'total'>): void;
  onEdit(id: string): void;
  onDelete(id: string): void;
  onAdd(): void;
}

const EntryList = ({
  data,
  pagination,
  loading,
  onChange,
  onEdit,
  onDelete,
  onAdd,
}: Props) => {
  const handleChange = (
    p: TablePaginationConfig,
    f: Record<string, React.Key[] | null>,
    s: SorterResult<Entry> | SorterResult<Entry>[]
  ) => {
    const { current = 0, pageSize = 10 } = p;
    const { field, order } = s as SorterResult<Entry>;

    onChange({
      current,
      pageSize,
      sortField: field as keyof Entry,
      sortOrder: order as 'ascend' | 'descend' | null,
    });
  };

  const renderActionColumn = (id: string) => (
    <Space size="middle">
      <Button onClick={() => onEdit(id)}>Edit</Button>
      <Button onClick={() => onDelete(id)}>Delete</Button>
    </Space>
  );

  const columns: ColumnsType<Entry> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => moment(date).format('DD-MM-YYYY'),
      sorter: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, { _id }) => renderActionColumn(_id),
    },
  ];

  const getColumns = (
    sortField: keyof Entry,
    sortDirection: 'ascend' | 'descend' | null
  ) => {
    const getSortData = (key: keyof Entry) => {
      const isSorted = sortField === key;

      return {
        sortOrder: isSorted ? sortDirection : null,
      };
    };

    return columns.map(col => ({
      ...col,
      ...getSortData(col.key as keyof Entry),
    }));
  };

  const { sortField, sortOrder, ...paginationData } = pagination;

  return (
    <>
      <Table
        columns={getColumns(sortField, sortOrder)}
        dataSource={data}
        rowKey="_id"
        loading={loading}
        pagination={{
          ...paginationData,
          showSizeChanger: true,
          defaultPageSize: 2,
          pageSizeOptions: ['2', '5'],
        }}
        onChange={handleChange}
        scroll={{ x: true }}
      />
      <Button variant="contained" color="primary" onClick={onAdd}>
        Add entry
      </Button>
    </>
  );
};

export default EntryList;
