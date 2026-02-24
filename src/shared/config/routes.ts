// shared/config/routes.ts
export const RoutePaths = {
  // Публичные маршруты
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',

  // Маршруты с параметрами
  EVENT_DETAILS: '/event/:id',
  COMPANY_DETAILS: '/company/:id',
  LOCATION_DETAILS: '/location/:id',

  // Защищенные маршруты
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  VERIFICATION: '/verification',
  REGIONS: '/regions',

  // 404
  NOT_FOUND: '*',
} as const;

export const routes = {
  home: () => RoutePaths.HOME,
  signIn: () => RoutePaths.SIGN_IN,
  signUp: () => RoutePaths.SIGN_UP,
  event: (id: string | number) => `/event/${id}`,
  company: (id: string | number) => `/company/${id}`,
  location: (id: string | number) => `/location/${id}`,
  profile: () => RoutePaths.PROFILE,
  profileEdit: () => RoutePaths.PROFILE_EDIT,
  verification: () => RoutePaths.VERIFICATION,
  regions: () => RoutePaths.REGIONS,
} as const;
