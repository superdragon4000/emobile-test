import express, { IRouter, Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import AuthController from '../auth/auth.controller';
import { errorMiddleware } from '../middleware/error.middleware';
import UsersController from '../users/users.controller';
import { setupSwagger } from '../config/swagger';

class App {
  public app: Application;

  public router: IRouter;

  constructor() {
    this.app = express();
    this.router = express.Router();
    this.set_config();

    new AuthController(this.router, '/auth');
    new UsersController(this.router, '/users');
  }

  private set_config() {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    
    setupSwagger(this.app as any);

    this.app.use(errorMiddleware);
    this.app.use(cors());
    this.app.use(express.static('static'));
    this.app.use('/api/v1', this.router);
    this.app.use((req, res) => { res.status(404).json({ message: 'Route not found', path: req.originalUrl, }); });
  }
}

export default new App().app;
