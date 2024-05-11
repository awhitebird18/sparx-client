import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import dayjs, { Dayjs } from 'dayjs';

type HistoryItem = {
  createdOn: Dayjs;
  label: string;
  status: CompletionStatus;
  id: number;
};

export const history: HistoryItem[] = [
  {
    id: 1,
    label: 'Arrays',
    createdOn: dayjs('01/02/2024'),
    status: CompletionStatus.Complete,
  },
  {
    id: 2,
    label: 'Objects',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.InProgress,
  },
  {
    id: 3,
    label: 'Docker',
    createdOn: dayjs('01/05/2024'),
    status: CompletionStatus.InProgress,
  },
  {
    id: 4,
    label: 'Objects',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.Complete,
  },
  {
    id: 5,
    label: 'Dates',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.OnHold,
  },
  {
    id: 6,
    label: 'React',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.Complete,
  },
  {
    id: 7,
    label: 'Vue',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.Complete,
  },
  {
    id: 8,
    label: 'Dates',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.OnHold,
  },
  {
    id: 9,
    label: 'React',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.Complete,
  },
  {
    id: 10,
    label: 'Vue',
    createdOn: dayjs('01/03/2024'),
    status: CompletionStatus.Complete,
  },
];
