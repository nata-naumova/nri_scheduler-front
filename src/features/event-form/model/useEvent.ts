import { UseFormReturn, useWatch } from 'react-hook-form';
import { IFormCreateEvent } from './types';
import { useEffect } from 'react';

export const useEvent = (form: UseFormReturn<IFormCreateEvent>) => {
  const { control, setValue } = form;

  const isStart = useWatch({ control, name: 'start' });
  const isMaxSlotsChecked = useWatch({ control, name: 'isMax_slots' });
  const isMaxDuration = useWatch({ control, name: 'isPlan_duration' });

  useEffect(() => {
    if (isMaxSlotsChecked) {
      setValue('max_slots', null);
    }
    if (isMaxDuration) {
      setValue('plan_duration', null);
    }
  }, [isMaxSlotsChecked, isMaxDuration, setValue]);

  return {
    isStart,
    isMaxSlotsChecked,
    isMaxDuration,
  };
};
