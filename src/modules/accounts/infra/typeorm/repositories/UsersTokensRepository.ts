import { getRepository, Repository } from 'typeorm';

import ICreateUserTokenDTO from '@modules/accounts/dtos/ICreateUsersTokenDTO';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';

import UserTokens from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({ expiring_date, refresh_token, user_id }: ICreateUserTokenDTO) {
    const userToken = this.repository.create({
      expiring_date,
      refresh_token,
      user_id,
    });
    await this.repository.save(userToken);
    return userToken;
  }
}

export default UsersTokensRepository;
