import { usePageMeta } from '@/shared/lib/usePageMeta';
import { Button, Container, Heading, Link, Text } from '@chakra-ui/react';

export function HomePage() {
  usePageMeta({
    title: 'Главная - NRI',
    description: 'Календарь НРИ событий - Главная страница',
  });

  return (
    <section>
      <Container>
        <Heading>Добро пожаловать в НРИ Календарь</Heading>
        <Text>
          Мы создали этот сервис, чтобы упростить вашу жизнь. Начните использовать все его
          возможности прямо сейчас!
        </Text>
        <Link href="/calendar" mt={4}>
          <Button type="button">Календарь</Button>
        </Link>
      </Container>
    </section>
  );
}
