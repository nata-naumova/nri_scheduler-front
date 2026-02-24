import { softCheck } from '@/entities/user/api/api-profile';
import { verifyEmail } from '@/shared/api/auth';
import { EVerificationChannel } from '@/shared/config/constants';
import { Check, Error } from '@/shared/ui/icons';
import { toaster } from '@/shared/ui/toaster';
import { Box, Button, Container, HStack, Image, Link, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const VerificationPage = () => {
  const navigate = useNavigate();

  const channel = 'email';
  const code = 'code';

  if (channel !== EVerificationChannel.EMAIL || !code) {
    toaster.error({ title: 'Некорректная ссылка подтверждения' });
    navigate('/calendar');
    return;
  }

  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    verifyEmail(code).then((res) => {
      if (res) {
        softCheck();
        toaster.success({
          title: 'Электронная почта успешно верифицирована',
        });
        setSuccess(true);
      }
      setFetching(false);
      // timeout = setTimeout(() => navigate('/calendar'), 5000);
    });

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container mb={6}>
      {fetching ? (
        <Spinner />
      ) : (
        <Box width="100%" padding="4" borderWidth="1px">
          <HStack>
            {success ? (
              <>
                <Check />
                <>Электронная почта успешно верифицирована</>
              </>
            ) : (
              <>
                <Error />
                <>Не удалось верифицировать электронную почту</>
              </>
            )}
          </HStack>
        </Box>
      )}
    </Container>
  );
};

export default VerificationPage;
