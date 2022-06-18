import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/DateProvider/implementations/DayjsDateProvider';
import MailProviderInMemory from '@shared/container/MailProvider/in-memory/MailProviderInMemory';
import AppError from '@shared/errors/AppError';

import SendForgotPasswordMailUseCase from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const email = 'misapso@kos.sr';
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      name: 'Mathilda Banks',
      email,
      password: 'j13otn8s',
      driver_license: '957761',
    });

    await sendForgotPasswordMailUseCase.execute(email);

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send a forgot password mail to a non existing user', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('dibuw@pe.sg'),
    ).rejects.toEqual(new AppError('User does not exist'));
  });

  it('should be able to create a user token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    const email = 'ga@si.ls';
    usersRepositoryInMemory.create({
      name: 'Dora Bishop',
      email,
      driver_license: '979882',
      password: 'p8297bym',
    });

    await sendForgotPasswordMailUseCase.execute(email);

    expect(generateTokenMail).toBeCalled();
  });
});
