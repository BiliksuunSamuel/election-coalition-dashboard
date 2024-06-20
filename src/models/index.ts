export interface IBaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  createdBy: string;
}

export interface IBaseFilter {
  page?: number;
  pageSize?: number;
}
