import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';
import IDateProvider from '@shared/container/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

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
  refreshToken: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      tokenExpiringTime,
      tokenSecret,
      refreshTokenSecret,
      refreshTokenExpiringTime,
      refreshTokenExpiringTimeInDays,
    } = auth;

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, tokenSecret, {
      subject: user.id,
      expiresIn: tokenExpiringTime,
    });

    const refreshToken = sign({ email }, refreshTokenSecret, {
      subject: user.id,
      expiresIn: refreshTokenExpiringTime,
    });

    const refreshTokenExpiringDate = this.dateProvider.addDays(refreshTokenExpiringTimeInDays);

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: refreshToken,
      expiring_date: refreshTokenExpiringDate,
    });

    const userReturn = {
      name: user.name,
      email: user.email,
    };

    return {
      user: userReturn,
      token,
      refreshToken,
    };
  }
}

export default AuthenticateUserUseCase;
