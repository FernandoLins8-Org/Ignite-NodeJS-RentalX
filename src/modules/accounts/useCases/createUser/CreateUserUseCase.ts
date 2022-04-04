import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name, email, password, driver_license,
  }: ICreateUserDTO) {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppError('User email already exists');
    }

    const hashedPassword = await hash(password, 10);

    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license,
    });
  }
}

export default CreateUserUseCase;
