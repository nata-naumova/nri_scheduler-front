export const emailValidation = {
  required: 'Заполните поле',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Некорректный email',
  },
};

export const repasswordValidation = {
  required: 'Заполните поле',
  validate: (v) => v === getValues('password') || 'Пароли не совпадают',
};
