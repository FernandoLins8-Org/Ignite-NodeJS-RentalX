import { Router } from 'express';

import SendForgotPasswordMailController from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailUseCaseController';

const passwordRoutes = Router();

const sendForgetPasswordMailController = new SendForgotPasswordMailController();

passwordRoutes.post('/forgot', sendForgetPasswordMailController.handle);

export default passwordRoutes;
