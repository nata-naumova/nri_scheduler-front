import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { PublicOnlyLayout } from './public-only-layout';
import { ProtectedLayout } from './protected-layout';
import { Layout } from './layout';

import SingUpPage from '@/pages/sign-up/ui/sign-up-page';
// import { HomePage } from '@/pages/home';
import { SignInPage } from '@/pages/sign-in/ui/sing-in-page';
import { EventPage } from '@/pages/event';
import { LocationPage } from '@/pages/location/ui/location';
import { NotFoundPage } from '@/pages/not-found/ui/not-found';
import { CompanyPage } from '@/pages/company/ui/company-page';
import { ProfilePage } from '@/pages/profile';
import CalendarPage from '@/pages/calendar/ui/calendar';
import VerificationPage from '@/pages/verification/verification';
import { RoutePaths } from '@/shared/config/routes';

function AppRouter() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route element={<PublicOnlyLayout />}>
          <Route path={RoutePaths.SIGN_IN} element={<SignInPage />} />
          <Route path={RoutePaths.SIGN_UP} element={<SingUpPage />} />
        </Route>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path={RoutePaths.HOME} element={<CalendarPage />} />

          <Route element={<ProtectedLayout />}>
            <Route path={RoutePaths.EVENT_DETAILS} element={<EventPage />} />
            <Route path={RoutePaths.COMPANY_DETAILS} element={<CompanyPage />} />
            <Route path={RoutePaths.LOCATION_DETAILS} element={<LocationPage />} />
            <Route path={RoutePaths.PROFILE} element={<ProfilePage />} />
            <Route path={RoutePaths.VERIFICATION} element={<VerificationPage />} />
            {/* <Route path="/profile/:id" element={<ShortProfilePage />} /> */}
            {/* <Route path={RoutePaths.PROFILE_EDIT} element={<ProfileEdit />} /> */}
            {/* <Route path={RoutePaths.REGIONS} element={<RegionsPage />} /> */}
          </Route>

          <Route path={RoutePaths.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
