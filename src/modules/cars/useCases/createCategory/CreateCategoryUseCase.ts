import ICategoriaRepository from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string
  description: string
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriaRepository) {}

  execute({ name, description }: IRequest) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error('Category Already Exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryUseCase;
