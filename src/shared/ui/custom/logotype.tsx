import { Link } from '@chakra-ui/react';

interface LogotypeProps {
  href?: string;
}

export const Logotype = ({ href = '#' }: LogotypeProps) => (
  <Link variant="plain" href={href} fontWeight={600} fontSize={20} minHeight="44px">
    НРИ Календарь
  </Link>
);
