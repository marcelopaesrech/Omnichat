export interface ICrud<T> {
  findAll(): T[];
  findById(id: number): T;
  create(): void;
  update(): void;
}
