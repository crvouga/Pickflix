export interface IUnitOfWork {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export interface Identifiable {
  id: string;
}

export type PaginationOptions = {
  page: number;
  pageSize: number;
};

export type OrderByOptions<T> = [keyof T, "ascend" | "descend"][];

export type RepositoryQueryOptions<T> = {
  orderBy?: OrderByOptions<T>;
  pagination?: PaginationOptions;
};

export interface IGenericRepository<T extends Identifiable> {
  find: (_: Partial<T>, options?: RepositoryQueryOptions<T>) => Promise<T[]>;

  search: (
    query: string,
    keys: (keyof T)[],
    options?: RepositoryQueryOptions<T>
  ) => Promise<T[]>;

  add: (_: T[]) => Promise<T[]>;

  remove: (_: Partial<T>[]) => Promise<boolean>;

  update: (_: Partial<T> & Pick<T, "id">) => Promise<T>;

  count: (_: Partial<T>) => Promise<number>;
}