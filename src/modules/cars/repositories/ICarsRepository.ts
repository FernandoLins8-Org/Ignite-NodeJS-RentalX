import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import Car from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>
  findByLicensePlate(license_plate: string): Promise<Car>
  findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
    ): Promise<Car[]>
}

export default ICarsRepository;