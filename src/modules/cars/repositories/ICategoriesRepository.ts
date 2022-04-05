import Category from '@modules/cars/infra/typeorm/entities/Category';

// DTO =>Data Transfer Object
export interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategoriaRepository {
  findByName(name: string): Promise<Category>
  list(): Promise<Category[]>
  create({ name, description }: ICreateCategoryDTO): Promise<void>
}

export default ICategoriaRepository;
