import { useState } from 'react';
import { useStore } from '@/stores/RootStore';
import preferencesApi from '../api';
import { timeOptions } from '@/utils/timeUtils';
import { NotificationType } from '../enums/NotificationType';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectTrigger,
} from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';
import { observer } from 'mobx-react-lite';

enum NotificationSchedule {
  DAILY = 'daily',
  WEEKDAYS = 'weekdays',
}

const NotificationsTab = observer(() => {
  const { notificationType, setNotificationType } = useStore('userPreferencesStore');
  const [notificationSchedule, setNotificationSchedule] = useState<NotificationSchedule>(
    NotificationSchedule.DAILY,
  );
  const [notificationStart, setNotificationStart] = useState<string>('32400');
  const [notificationEnd, setNotificationEnd] = useState<string>('79200');

  const handleNotificationSchedule = (value: NotificationSchedule) => {
    setNotificationSchedule(value);
  };

  const handleNotificationStartTime = (time: string) => {
    setNotificationStart(time);
  };

  const handleNotificationEndTime = (time: string) => {
    setNotificationEnd(time);
  };

  const handleSetNotificationType = async (value: NotificationType) => {
    await preferencesApi.updateUserPreferences({ notificationType: value });
    setNotificationType(value);
  };

  return (
    <div>
      <div>
        <p className="text-sm text-muted-foreground mb-6">
          Change the appearance of Sparx across all of your workspaces.
        </p>

        <RadioGroup
          defaultValue={notificationType}
          className="flex flex-col space-y-3 mb-10"
          onValueChange={handleSetNotificationType}
        >
          <div className="flex space-x-2">
            <RadioGroupItem value="all" />
            <Label className="font-normal">All new messages</Label>
          </div>
          <div className="flex space-x-2">
            <RadioGroupItem value="mentions" />
            <Label className="font-normal">Direct messages and mentions</Label>
          </div>
          <div className="flex space-x-2">
            <RadioGroupItem value="none" />
            <Label className="font-normal">Nothing</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Notification Schedule</p>
        <div className="flex gap-2">
          <Select onValueChange={handleNotificationSchedule} defaultValue={notificationSchedule}>
            <SelectTrigger className="h-14">
              <SelectValue placeholder="Every day" />
            </SelectTrigger>
            <SelectContent className="max-h-48">
              <SelectGroup>
                <SelectItem value="daily">Every day</SelectItem>
                <SelectItem value="weekdays">Weekdays</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={handleNotificationStartTime} defaultValue={notificationStart}>
            <SelectTrigger className="h-14">
              <SelectValue placeholder="Start Time" />
            </SelectTrigger>
            <SelectContent className="max-h-48">
              <SelectGroup>
                {timeOptions.map((time: string, index: number) => (
                  <SelectItem value={String(index * 1800)}>{time}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={handleNotificationEndTime} defaultValue={notificationEnd}>
            <SelectTrigger className="h-14">
              <SelectValue placeholder="End Time" />
            </SelectTrigger>
            <SelectContent className="max-h-48">
              <SelectGroup>
                {timeOptions.map((time: string, index: number) => (
                  <SelectItem value={String(index * 1800)}>{time}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
});

export default NotificationsTab;
