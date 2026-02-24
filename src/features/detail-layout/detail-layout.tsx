import { AppBreadcrumb } from '@/shared/ui/custom/app-breadcrumbs';
import { Container, Image } from '@chakra-ui/react';

export const DetailLayout = ({ children }: { children: React.ReactNode }) => (
  <Container>
    <Image
      rounded="md"
      w="full"
      h="220px"
      src="https://i.pinimg.com/1200x/05/35/aa/0535aa40980766a6302dad4890226fe2.jpg"
      alt="Обложка кампании"
    />

    <AppBreadcrumb />

    {children}
  </Container>
);
