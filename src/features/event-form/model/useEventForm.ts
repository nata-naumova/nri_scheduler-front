import { useForm } from 'react-hook-form';
import { IFormCreateEvent } from './types';
import { EventFormSchema } from './schema';

export const useEventForm = () => {
  const form = useForm<IFormCreateEvent>({
    // resolver: zodResolver(eventSchema),
    defaultValues: {
      //   eventType: 'online',
      //   priority: 'medium',
      //   requiresApproval: false,
      //   tags: [],
    },
  });

  const onSubmit = (data: EventFormSchema) => {
    console.log(data);
    //   const { company, location, start, startTime, max_slots, plan_duration } = data;
    //   const date = dayjs.tz(`${start} ${startTime}`, EVENT_FORMAT, props.tz);
    //   setIsDisableCreateEventSubmitButton(true);
    // createEvent(
    //   company,
    //   date.toISOString(),
    //   location,
    //   Number(max_slots) || null,
    //   Number(plan_duration) || null,
    // )
    //   .then((res) => {
    //     if (res) {
    //       toaster.success({ title: 'Событие успешно создано' });
    //       props.setOpenDraw(false);
    //       props.getNewEvent(res.payload);
    //       reset();
    //     }
    //   })
    //   .finally(() => {
    //     setIsDisableCreateEventSubmitButton(false);
    //   });
  };

  return {
    form,
    onSubmit,
  };
};
