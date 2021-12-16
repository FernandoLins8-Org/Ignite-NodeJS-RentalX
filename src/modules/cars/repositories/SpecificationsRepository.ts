import Specification from '../model/Specification';
import ISpecificationsRepository, { ICreateSpecificationDTO } from './ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Array<Specification>;

  constructor() {
    this.specifications = [];
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    const newSpecification = new Specification();
    Object.assign(newSpecification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(newSpecification);
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find((specification) => name === specification.name);
    return specification;
  }

  list() {
    return this.specifications;
  }
}

export default SpecificationsRepository;
