export interface DefaultRequestParams {}

export interface PaginationRequestParams<T> extends DefaultRequestParams {
  sortBy: keyof T;
  direction: 'ascend' | 'descend' | null;
  page: string;
  limit: string;
}

interface PaginationMetadata {
  total: number;
}

export type PaginatedResponseData<T> = {
  data: T | T[] | null;
  metadata?: PaginationMetadata;
};
