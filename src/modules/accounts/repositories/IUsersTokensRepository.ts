import ICreateUserTokenDTO from '../dtos/ICreateUsersTokenDTO';
import UserTokens from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create({ expiring_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens>
}

export default IUsersTokensRepository;