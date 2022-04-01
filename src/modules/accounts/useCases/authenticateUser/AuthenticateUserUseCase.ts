import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../errors/AppError';
import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, 'b09f5e231a991b7e8d3319d400fa9f38', {
      subject: user.id,
      expiresIn: '1d',
    });

    const userReturn = {
      name: user.name,
      email: user.email,
    };

    return {
      user: userReturn,
      token,
    };
  }
}

export default AuthenticateUserUseCase;
