import { LoginData } from '@/features/auth/types';
import { RegisterFormData } from '@/features/auth/types/registerFormData';

export interface AuthContextData {
  userLogin: (loginData: LoginData) => Promise<void>;
  userLogout: () => void;
  registerUser: (registrationData: RegisterFormData) => Promise<{ userId: string }>;
  verifyAndLoginUser: () => void;
  registerAnonymous: () => void;
}
