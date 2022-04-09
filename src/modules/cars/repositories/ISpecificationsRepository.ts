import Specification from '@modules/cars/infra/typeorm/entities/Specification';

export interface ICreateSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>
  findByName(name: string): Promise<Specification>
  list(): Promise<Specification[]>
  findByIds(ids: string[]): Promise<Specification[]>
}

export default ISpecificationsRepository;
