import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  execute({ name, description }: IRequest) {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists');
    }

    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export default CreateSpecificationUseCase;
