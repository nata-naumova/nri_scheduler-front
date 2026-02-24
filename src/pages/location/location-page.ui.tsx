import { Box } from '@chakra-ui/react';
import { LocationCard } from '../../features/location-detail/location-card';
import { DetailLayout } from '@/features/detail-layout/detail-layout';
import { LOCATION_MOCK } from '@/features/location-detail/location.mock';

export const LocationPage = () => {
  return (
    <Box as="section">
      <DetailLayout>
        <LocationCard item={LOCATION_MOCK} />
      </DetailLayout>
    </Box>
  );
};
