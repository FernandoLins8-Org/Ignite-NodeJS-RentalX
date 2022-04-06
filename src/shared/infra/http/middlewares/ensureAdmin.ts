import { NextFunction, Request, Response } from 'express';

import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const userId = req.user_id;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(userId);

  if (!user.isAdmin) {
    throw new AppError('User must be admin');
  }

  return next();
}
