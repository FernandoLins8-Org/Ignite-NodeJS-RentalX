import ICreateUserTokenDTO from '../dtos/ICreateUsersTokenDTO';
import UserTokens from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create({ expiring_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens>
  findUserByIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens>
  deleteById(id: string): Promise<void>
}

export default IUsersTokensRepository;
