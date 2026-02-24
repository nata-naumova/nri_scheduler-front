import { CompanyCard } from '../../features/company-details/company-card';
import { CompanyDialog } from '@/features/company-details/company-dialog.ui';
import { COMPANY_MOCK } from '@/features/company-details/company.mock';
import { DetailLayout } from '@/features/detail-layout/detail-layout';
import { Box } from '@chakra-ui/react';

export const CompanyPage = () => {
  return (
    <Box as="section">
      <DetailLayout>
        {/* readCompanyById(companyId) */}
        <CompanyCard item={COMPANY_MOCK} />

        {/* company?.you_are_master */}
        <CompanyDialog item={COMPANY_MOCK} />
      </DetailLayout>
    </Box>
  );
};
