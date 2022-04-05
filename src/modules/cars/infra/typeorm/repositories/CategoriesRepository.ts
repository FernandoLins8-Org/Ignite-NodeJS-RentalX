import { getRepository, Repository } from 'typeorm';

import ICategoriaRepository, { ICreateCategoryDTO } from '@modules/cars/repositories/ICategoriesRepository';

import Category from '../entities/Category';

class CategoriesRepository implements ICategoriaRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO) {
    const newCategory = this.repository.create({
      name,
      description,
    });
    await this.repository.save(newCategory);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string) {
    const category = await this.repository.findOne({ name });
    return category;
  }
}

export default CategoriesRepository;
