import { Box, Breadcrumb } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export const AppBreadcrumb = () => {
  const location = useLocation();

  const segments = location.pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb.Root my={4}>
      <Breadcrumb.List>
        {segments.map((segment, index) => {
          const to = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;

          return (
            <Breadcrumb.Item key={index}>
              {isLast ? (
                <Breadcrumb.CurrentLink>{segment}</Breadcrumb.CurrentLink>
              ) : (
                <Breadcrumb.Link asChild>
                  <RouterLink to={to}>{segment}</RouterLink>
                </Breadcrumb.Link>
              )}
              {!isLast && <Breadcrumb.Separator />}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};
