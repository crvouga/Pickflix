import { GenericRepositoryHashMap } from "../../app/data-access/generic-repository.hash-map";
import { RepositoryQueryOptions } from "../../app/data-access/types";
import { Review, ReviewId } from "../models/make-review";
import { GenericRepositoryFileSystem } from "../../app/data-access/generic-repository.file-system";

export interface IReviewRepository {
  find(
    spec: Partial<Review>,
    options?: RepositoryQueryOptions<Review>
  ): Promise<Review[]>;

  add(review: Review): void;

  remove(id: ReviewId): void;

  count(spec: Partial<Review>): Promise<number>;

  update(id: ReviewId, partial: Partial<Review>): void;
}

export class ReviewRepositoryHashMap implements IReviewRepository {
  repository: GenericRepositoryHashMap<Review>;

  constructor(hashMap: { [id: string]: Review }) {
    this.repository = new GenericRepositoryHashMap<Review>(hashMap);
  }

  async find(spec: Partial<Review>, options?: RepositoryQueryOptions<Review>) {
    return this.repository.find(spec, options);
  }

  async add(review: Review) {
    this.repository.add([review]);
  }

  async remove(id: ReviewId) {
    this.repository.remove([{ id }]);
  }

  async count(spec: Partial<Review>) {
    return this.repository.count(spec);
  }

  async update(id: ReviewId, partial: Partial<Review>) {
    this.repository.update({ id, ...partial });
  }
}

export class ReviewRepositoryFileSystem implements IReviewRepository {
  repository: GenericRepositoryFileSystem<Review>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<Review>(filePath);
  }

  async find(spec: Partial<Review>, options?: RepositoryQueryOptions<Review>) {
    return this.repository.find(spec, options);
  }

  async add(review: Review) {
    this.repository.add([review]);
  }

  async remove(id: ReviewId) {
    this.repository.remove([{ id }]);
  }

  async count(spec: Partial<Review>) {
    return this.repository.count(spec);
  }

  async update(id: ReviewId, partial: Partial<Review>) {
    this.repository.update({ id, ...partial });
  }
}