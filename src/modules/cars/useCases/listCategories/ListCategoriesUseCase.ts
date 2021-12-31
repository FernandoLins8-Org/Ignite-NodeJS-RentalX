import { inject, injectable } from 'tsyringe';

import Category from '../../entities/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  execute(): Promise<Category[]> {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}

export default ListCategoryUseCase;
