import { Container } from '@chakra-ui/react';
import { ProfileTabs } from '@/widgets/profile-tabs/ui/profile-tabs';
import { EventApplications } from '@/widgets/event-list/ui/event-applications';
import { CompanyList } from '@/widgets/company-list/ui/company-list';
import { ProfileInfoWidget } from '@/widgets/profile-info/ui/profile-info';

export const ProfilePage = () => {
  return (
    <Container>
      <ProfileTabs>
        <ProfileInfoWidget />
        <EventApplications />
        <CompanyList />
        {/* <ResetPassword /> */}
      </ProfileTabs>
    </Container>
  );
};
