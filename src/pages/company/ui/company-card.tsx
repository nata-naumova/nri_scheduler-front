import { IApiCompanyInfo } from '@/entities/company/api/types';
import { convertEventStyleToCSS } from '@/shared/utils';
import { Card, DataList, Heading, HStack, Link } from '@chakra-ui/react';

export const CompanyCard = ({ company }: { company: IApiCompanyInfo }) => {
  const stats = [
    { label: 'Система', value: company.system },
    { label: 'Мастер игры', value: company.master_name, href: '#' },
    { label: 'Описание', value: company.description },
  ];

  return (
    <Card.Root width="full">
      <Card.Body>
        <HStack mb="6" gap="3">
          <Heading size="3xl">Кампания - {company.name}</Heading>
          <div className="sx__month-grid-event" style={convertEventStyleToCSS(company.event_style)}>
            Внешний вид события в календаре
          </div>
        </HStack>
        <DataList.Root orientation="horizontal">
          {stats.map((item) => (
            <DataList.Item key={item.label}>
              <DataList.ItemLabel minW="150px">{item.label}</DataList.ItemLabel>
              <DataList.ItemValue color="black" fontWeight="500">
                {item.href ? (
                  <Link href={item.href} colorPalette="blue">
                    {item.value}
                  </Link>
                ) : (
                  <span>{item.value}</span>
                )}
              </DataList.ItemValue>
            </DataList.Item>
          ))}
        </DataList.Root>
      </Card.Body>
    </Card.Root>
  );
};
