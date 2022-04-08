import { Router } from 'express';
import { handleReg, handleLogin, logOut } from '../controllers/loginController';
import { registerValidators, loginValidators } from '../utils/validators';
const router = Router();

router
    .post('/login', loginValidators, handleLogin)
    .post('/regist', registerValidators, handleReg)
    .get('/logout', logOut)


module.exports = router;
