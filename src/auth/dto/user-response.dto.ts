import { UserRole } from '../../model/User.entity';

export interface UserResponseDto {
  id: number;
  email: string;
  created_at: Date;
  updated_at: Date;
  firstName: string;
  lastName: string;
  patronymic?: string;
  birthDate: Date;
  role: UserRole;
  isActive: boolean;
}
