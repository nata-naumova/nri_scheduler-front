import { IApiEvent } from '../../api/types';

export interface EventCardProps {
  event: IApiEvent;
  updateEventData: () => void;
}
