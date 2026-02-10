import { TG_BOT_ID } from '@/shared/config/constants';
import { Button } from '@chakra-ui/react';

export const TgAuthButton = ({ loading, submitTg, text }) => (
  <Button
    type="button"
    backgroundColor="#08c"
    disabled={!TG_BOT_ID || loading}
    w="full"
    onClick={() => {
      window.Telegram.Login.auth({ bot_id: TG_BOT_ID!, request_access: true }, submitTg);
    }}
  >
    <TelegramIcon /> {text}
  </Button>
);
