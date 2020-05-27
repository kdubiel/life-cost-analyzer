export interface PaginationProps<T> {
  current: number;
  pageSize: number;
  total: number;
  sortField: keyof T;
  sortOrder: 'ascend' | 'descend' | null;
}
