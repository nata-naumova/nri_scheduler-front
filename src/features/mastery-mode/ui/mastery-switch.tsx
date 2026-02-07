import { Switch } from '@chakra-ui/react';
import { useStore } from '@nanostores/react';
import { $mastery, enableMastery, disableMastery } from '@/app/store/mastery';

export const MasterySwitch = (isVerified: boolean) => {
  const mastery = useStore($mastery);

  return (
    <Switch.Root
      size="lg"
      checked={mastery && isVerified}
      disabled={!isVerified}
      onCheckedChange={() => (mastery ? disableMastery() : enableMastery())}
    >
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Режим мастера</Switch.Label>
    </Switch.Root>
  );
};
