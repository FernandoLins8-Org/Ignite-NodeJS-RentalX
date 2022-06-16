import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';
import IDateProvider from '@shared/container/DateProvider/IDateProvider';
import IMailProvider from '@shared/container/MailProvider/IMailProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exist');
    }

    const token = uuidV4();
    const expiringDate = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expiring_date: expiringDate,
    });

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      `O link para o reset é ${token}`,
    );
  }
}

export default SendForgotPasswordMailUseCase;
