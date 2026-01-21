import { IRouter } from 'express';
import UsersService from './users.service';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

class UsersController {
  private usersService = new UsersService();

  constructor(
    private router: IRouter,
    private prefix: string,
  ) {
    this.routes();
  }

  private routes() {
    this.router.get(`${this.prefix}/:id`, authMiddleware, (req, res) =>
      this.usersService.getById(req, res),
    );
    this.router.get(
      `${this.prefix}/`,
      authMiddleware,
      roleMiddleware(['ADMIN']),
      (req, res) => this.usersService.getAll(req, res),
    );
    this.router.patch(`${this.prefix}/block/:id`, authMiddleware, (req, res) =>
      this.usersService.blockById(req, res),
    );
  }
}

export default UsersController;
