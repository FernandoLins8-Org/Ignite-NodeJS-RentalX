import Specification from '@modules/cars/infra/typeorm/entities/Specification';

import ISpecificationsRepository, { ICreateSpecificationDTO } from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((spec) => spec.name === name);
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((spec) => ids.includes(spec.id));
  }
}

export default SpecificationsRepositoryInMemory;
