import fs from "fs";
import configuration from "../configuration";
import { GenericRepositoryHashMap } from "./generic-repository.hash-map";
import {
  Identifiable,
  IGenericRepository,
  RepositoryQueryOptions,
} from "./types";

export class GenericRepositoryFileSystem<T extends Identifiable>
  implements IGenericRepository<T> {
  filePath: string;
  repositoryHashMap: GenericRepositoryHashMap<T>;

  constructor(filePath: string) {
    this.repositoryHashMap = new GenericRepositoryHashMap<T>({});
    this.filePath = filePath;
  }

  read(): { [id: string]: T } {
    try {
      const hashMap = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
      this.repositoryHashMap.hashMap = hashMap;
      return hashMap;
    } catch (error) {
      this.repositoryHashMap.hashMap = {};
      return {};
    }
  }

  write() {
    const hashMap = this.repositoryHashMap.hashMap;
    fs.writeFileSync(this.filePath, JSON.stringify(hashMap));
  }

  async find(
    entityInfo: Partial<T>,
    options?: RepositoryQueryOptions<T>
  ): Promise<T[]> {
    this.read();
    return await this.repositoryHashMap.find(entityInfo, options);
  }

  async search(
    query: string,
    keys: (keyof T)[],
    options?: RepositoryQueryOptions<T>
  ): Promise<T[]> {
    this.read();
    return await this.repositoryHashMap.search(query, keys, options);
  }

  async count(entityInfo: Partial<T>): Promise<number> {
    this.read();
    return await this.repositoryHashMap.count(entityInfo);
  }

  async add(entities: T[]): Promise<T[]> {
    this.read();
    await this.repositoryHashMap.add(entities);
    this.write();
    return entities;
  }

  async remove(entityInfos: Partial<T>[]): Promise<boolean> {
    this.read();
    await this.repositoryHashMap.remove(entityInfos);
    this.write();
    return true;
  }

  async update(entityInfos: Partial<T> & Pick<T, "id">): Promise<T> {
    this.read();
    const updatedEntities = await this.repositoryHashMap.update(entityInfos);
    this.write();
    return updatedEntities;
  }
}