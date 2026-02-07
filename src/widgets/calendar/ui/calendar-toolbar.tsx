import { HStack, Skeleton } from '@chakra-ui/react';
import { Suspense, lazy } from 'react';
import { useStore } from '@nanostores/react';

import { $profile } from '@/app/store/profile';
import { $mastery } from '@/app/store/mastery';
import { MasterySwitch } from '@/features/mastery-mode/ui/mastery-switch';
import { HoverCard } from '@/shared/ui/hover-card';
import { Warning } from '@/shared/ui/icons';
import Location from '@/pages/calendar/location';
import Event from '@/pages/calendar/event';

const Company = lazy(() => import('@/pages/calendar/company'));
// const Location = lazy(() => import('./location'));
// const Event = lazy(() => import('./event'));

const skeleton = <Skeleton w="30%" />;

export const CalendarToolbar = () => {
  const profile = useStore($profile);
  const mastery = useStore($mastery);

  return (
    <HStack justifyContent="space-between" gap={4}>
      {!profile?.verified && profile?.signed && (
        <HoverCard content="Контактные данные не подтверждены">
          <Warning />
        </HoverCard>
      )}

      {profile?.signed && <MasterySwitch isVerified={profile?.verified} />}

      {mastery && profile?.verified && (
        <HStack gap={4}>
          <Suspense fallback={skeleton}>
            <Company />
          </Suspense>
          <Suspense fallback={skeleton}>
            <Location />
          </Suspense>
          <Suspense fallback={skeleton}>
            <Event />
          </Suspense>
        </HStack>
      )}
    </HStack>
  );
};
