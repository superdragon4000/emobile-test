import { Request, Response } from 'express';
import PostgresDataSource from '../database/dataSource/data.source';
import { User } from '../model/User.entity';
import bcrypt from 'bcrypt';
import { Equal } from 'typeorm';
import jwt from 'jsonwebtoken';
import { toUserResponseDto } from './dto/user.mapper';

class AuthService {
  private userRepo = PostgresDataSource.getRepository(User);

  register = async (req: Request, res: Response): Promise<void | Response> => {
    const { email, password, firstName, lastName, patronymic, birthDate } =
      req.body;

    const candidate = await this.userRepo.findOneBy({ email: Equal(email) });
    if (candidate) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepo.save({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      patronymic,
      birthDate: new Date(birthDate),
    });

    const safeUser = toUserResponseDto(user);

    res.status(201).json({ message: 'User created', user: safeUser });
  };

  validateLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await this.userRepo.findOneBy({ email: Equal(email) });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const access_token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: process.env.ACCESS_EXPIRES_IN || '1h' } as jwt.SignOptions,
    );

    const safeUser = toUserResponseDto(user);

    res.json({ message: 'Login successful', access_token, user: safeUser });
  };
}

export default AuthService;
