import { IApiProfile } from '@/entities/user/api/types';
import { isTestUser, TEST_USER } from '@/entities/user/profile/model/profile.mock';
import { TStoreProfile } from '@/entities/user/profile/model/profile.types';
import { IFormSignin } from '@/pages/sign-in/model/types';
import { computed, map } from 'nanostores';

interface TAuthStore {
  user: TStoreProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: TAuthStore = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Стор с состоянием авторизации
export const $authStore = map<TAuthStore>(initialState);

// Вычисляемые значения
export const $isAuthenticated = computed($authStore, (store) => store.isAuthenticated);
export const $currentUser = computed($authStore, (store) => store.user);
export const $authLoading = computed($authStore, (store) => store.isLoading);
export const $authError = computed($authStore, (store) => store.error);

// Функция входа
export const login = async (credentials: IFormSignin): Promise<boolean> => {
  // Устанавливаем состояние загрузки
  $authStore.setKey('isLoading', true);
  $authStore.setKey('error', null);

  try {
    // Имитация задержки API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Проверяем тестового пользователя
    if (isTestUser(credentials.email)) {
      // Успешный вход
      $authStore.set({
        user: TEST_USER,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Сохраняем в localStorage для персистентности
      localStorage.setItem('auth_user', JSON.stringify(TEST_USER));

      return true;
    }

    // Если пользователь не найден
    throw new Error('Пользователь не найден');
  } catch (error) {
    // Ошибка входа
    $authStore.set({
      ...initialState,
      error: error instanceof Error ? error.message : 'Ошибка входа',
    });

    return false;
  }
};

// Функция выхода
export const logout = () => {
  // Очищаем стор
  $authStore.set(initialState);

  // Удаляем из localStorage
  localStorage.removeItem('auth_user');

  // Опционально: очищаем другие данные
  localStorage.removeItem('auth_token');
};

// Функция проверки существующей сессии
export const checkAuthSession = () => {
  try {
    const savedUser = localStorage.getItem('auth_user');

    if (savedUser) {
      const user = JSON.parse(savedUser) as IApiProfile;

      $authStore.set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    }
  } catch (error) {
    console.error('Failed to restore auth session:', error);
  }

  return false;
};

// Инициализация при загрузке
export const initAuth = () => {
  // Проверяем сохраненную сессию
  checkAuthSession();

  // В режиме разработки можно автоматически залогинить тестового пользователя
  //   if (process.env.NODE_ENV === 'development') {
  //     const shouldAutoLogin = localStorage.getItem('dev_auto_login') !== 'false';
  //     if (shouldAutoLogin && !$authStore.get().isAuthenticated) {
  //       login({ email: TEST_CREDENTIALS.email });
  //     }
  //   }
};
