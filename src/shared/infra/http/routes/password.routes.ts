import { Router } from 'express';

import ResetPasswordController from '@modules/accounts/useCases/resetPassword/ResetPasswordController';
import SendForgotPasswordMailController from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailUseCaseController';

const passwordRoutes = Router();

const sendForgetPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', sendForgetPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export default passwordRoutes;
