import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import dayjs from 'dayjs';

export const history = [
  {
    uuid: '1',
    label: 'Arrays',
    createdOn: dayjs('01/02/2024'),
    status: CompletionStatus.Complete,
  },
  {
    uuid: '2',
    label: 'Objects',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.InProgress,
  },
  {
    uuid: '3',
    label: 'Docker',
    createdOn: dayjs('01/05/2024'),
    status: CompletionStatus.InProgress,
  },
  {
    uuid: '4',
    label: 'Objects',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.Complete,
  },
  {
    uuid: '5',
    label: 'Dates',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.OnHold,
  },
  {
    uuid: '6',
    label: 'React',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.Complete,
  },
  {
    uuid: '7',
    label: 'Vue',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.Complete,
  },
  {
    uuid: '8',
    label: 'Dates',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.OnHold,
  },
  {
    uuid: '9',
    label: 'React',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.Complete,
  },
  {
    uuid: '10',
    label: 'Vue',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.Complete,
  },
];
