import { getRepository, Repository } from 'typeorm';

import Specification from '@modules/cars/infra/typeorm/entities/Specification';
import ISpecificationsRepository, { ICreateSpecificationDTO } from '@modules/cars/repositories/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO) {
    const specification = this.repository.create({
      name,
      description,
    });
    await this.repository.save(specification);
  }

  async findByName(name: string) {
    const specification = this.repository.findOne({ name });

    return specification;
  }

  async list() {
    const specifications = await this.repository.find();
    return specifications;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }
}

export default SpecificationsRepository;
