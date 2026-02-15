import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Container } from '@chakra-ui/react';
import { navBack } from '@/shared/utils';
import { IApiLocation } from '@/entities/location/api/types';
import { readLocationById } from '@/entities/location/api/api';
import { NotFoundPage } from '@/pages/not-found/ui/not-found';
import { LocationCardSkeleton } from './location-card.skeleton';
import { LocationCard } from './location-card';

export const LocationPage = () => {
  const route = useNavigate();
  const locationId = 1;
  const [fetching, setFetching] = useState(false);
  // const [location, setLocation] = useState<IApiLocation | null>(null);

  const location = {
    id: 1,
    name: 'Москва',
    address: 'ул. Пушкина, д. 8',
    description: 'описание локации',
    region: 'РФ',
    city: 'Москва',
    map_link: 'map_link',
  };

  // useEffect(() => {
  //   if (locationId) {
  //     setFetching(true);
  //     readLocationById(locationId)
  //       .then((res) => {
  //         if (res !== null) {
  //           setLocation(res.payload);
  //         }
  //       })
  //       .finally(() => {
  //         setFetching(false);
  //       });
  //   }
  // }, [locationId]);

  return (
    <Container>
      <Button mb={4} onClick={navBack}>
        Вернуться назад
      </Button>
      {fetching ? <LocationCardSkeleton /> : <LocationCard location={location} />}
    </Container>
  );
};
