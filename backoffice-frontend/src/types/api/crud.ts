export interface CrudItem {
  id: string;
  deletedDateTime: string | null;
}

export interface CrudDataListRes {
  status: string;
  data: {
    total: number;
    page: number;
    pageSize: number;
    tableName: string;
    items: CrudItem[];
  };
}
export interface CrudDataDetailRes {
  status: string;
  data: {
    id: string;
    fields: {
      [key: string]: Record<string, unknown>;
    };
  };
}

export interface CrudDeleteRes {
  status: string;
  message: string;
}
