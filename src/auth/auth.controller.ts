import { IRouter } from 'express';
import AuthService from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { validateData } from '../middleware/validate.middleware';
import { LoginDto } from './dto/login.dto';

class AuthController {
  private authService = new AuthService();

  constructor(
    private router: IRouter,
    private prefix: string,
  ) {
    this.routes();
  }

  private routes() {
    this.router.post(`${this.prefix}/register`, validateData(RegisterDto), (req, res) =>
      this.authService.register(req, res),
    );
    this.router.post(`${this.prefix}/login`, validateData(LoginDto), (req, res) =>
      this.authService.validateLogin(req, res),
    );
  }
}

export default AuthController;
