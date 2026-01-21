import { User } from '../../model/User.entity';
import { UserResponseDto } from './user-response.dto';

export const toUserResponseDto = (user: User): UserResponseDto => ({
  id: user.id,
  email: user.email,
  created_at: user.created_at,
  updated_at: user.updated_at,
  firstName: user.firstName,
  lastName: user.lastName,
  patronymic: user.patronymic,
  birthDate: user.birthDate,
  role: user.role,
  isActive: user.isActive,
});
