import ICreateUserTokenDTO from '@modules/accounts/dtos/ICreateUsersTokenDTO';
import UserTokens from '@modules/accounts/infra/typeorm/entities/UserTokens';

import IUsersTokensRepository from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[];

  async create({
    expiring_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, {
      expiring_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);
    return userToken;
  }

  async findUserByIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (token) => token.user_id === user_id && token.refresh_token === refresh_token,
    );
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((token) => token.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find((token) => token.refresh_token === refresh_token);
    return userToken;
  }
}

export default UsersTokensRepositoryInMemory;
