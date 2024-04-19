import { LoginData, RegistrationData } from '@/features/auth/types';
import { User } from '@/features/users/types';

export interface AuthContextData {
  userLogin: (loginData: LoginData) => Promise<void>;
  userLogout: () => void;
  registerUser: (registrationData: RegistrationData) => Promise<User | undefined>;
  verifyAndLoginUser: () => void;
  registerAnonymous: () => void;
}
