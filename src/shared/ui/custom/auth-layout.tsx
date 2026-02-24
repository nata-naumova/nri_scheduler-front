import { ReactNode } from 'react';
import { AbsoluteCenter, Box, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footerText?: string;
  footerLinkHref: string;
  footerLinkText: string;
}

export const AuthLayout = ({
  title,
  subtitle,
  children,
  footerText,
  footerLinkHref,
  footerLinkText,
}: AuthLayoutProps) => (
  <Box position="relative" h="svh">
    <AbsoluteCenter w="full">
      <Stack maxW="lg" w="full">
        <Heading>{title}</Heading>
        {subtitle && (
          <Text mb="4" fontSize="md" color="fg.muted">
            {subtitle}
          </Text>
        )}

        {children}
        <HStack gap="2" fontSize="sm">
          <Text>{footerText}</Text>
          <Link variant="underline" href={footerLinkHref} color="#08c">
            {footerLinkText}
          </Link>
        </HStack>
      </Stack>
    </AbsoluteCenter>
  </Box>
);
