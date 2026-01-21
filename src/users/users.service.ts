import { Response } from 'express';
import PostgresDataSource from '../database/dataSource/data.source';
import { User } from '../model/User.entity';
import { toUserResponseDto } from '../auth/dto/user.mapper';
import { AuthRequest } from '../middleware/auth.middleware';
import { Equal } from 'typeorm';

class UsersService {
  private userRepo = PostgresDataSource.getRepository(User);

  getById = async (
    req: AuthRequest,
    res: Response,
  ): Promise<void | Response> => {
    const requestedId = Number(req.params.id);

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const isAdmin = req.user.role === 'ADMIN';
    const isSelf = req.user.id === requestedId;

    if (!isAdmin && !isSelf) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const user = await this.userRepo.findOneBy({ id: Equal(requestedId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(toUserResponseDto(user));
  };

  getAll = async (
    req: AuthRequest,
    res: Response,
  ): Promise<void | Response> => {
    const users = await this.userRepo.find();
    res.json(users.map(toUserResponseDto));
  };

  blockById = async (
    req: AuthRequest,
    res: Response,
  ): Promise<void | Response> => {
    const requestedId = Number(req.params.id);

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const isAdmin = req.user.role === 'ADMIN';
    const isSelf = req.user.id === requestedId;

    if (!isAdmin && !isSelf) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const user = await this.userRepo.findOneBy({ id: Equal(requestedId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(400).json({ message: 'User already blocked' });
    }

    await this.userRepo.update(user.id, { isActive: false });
    res.json({ message: 'User blocked successfully' });
  };
}

export default UsersService;
