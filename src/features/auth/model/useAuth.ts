import { useStore } from '@nanostores/react';
import {
  $authStore,
  $isAuthenticated,
  $currentUser,
  $authLoading,
  $authError,
  login,
  logout,
  checkAuthSession,
} from '@/entities/auth/model/auth.store';
import { TEST_USER } from '@/entities/user/profile/model/profile.mock';

// Основной хук авторизации
export const useAuth = () => {
  const auth = useStore($authStore);
  const isAuthenticated = useStore($isAuthenticated);
  const user = useStore($currentUser);
  const isLoading = useStore($authLoading);
  const error = useStore($authError);

  return {
    ...auth,
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout,
    checkAuthSession,
  };
};

// Хук для получения текущего пользователя (с фолбэком на тестового в dev)
export const useUser = () => {
  const user = useStore($currentUser);
  const isAuthenticated = useStore($isAuthenticated);

  // В режиме разработки, если нет авторизации, показываем тестового
  if (process.env.NODE_ENV === 'development' && !isAuthenticated) {
    return {
      user: TEST_USER,
      isTestMode: true,
    };
  }

  return {
    user,
    isTestMode: false,
  };
};

// Хук для проверки прав
export const useAuthGuard = () => {
  const isAuthenticated = useStore($isAuthenticated);
  const isLoading = useStore($authLoading);

  return {
    isAuthenticated,
    isLoading,
    canActivate: isAuthenticated && !isLoading,
  };
};
