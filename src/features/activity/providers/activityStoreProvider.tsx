import React, { useEffect, useState } from 'react';
import { ActivityStore } from '../stores/activityStore';
import { ActivityStoreContext } from '../hooks/useActivityStore';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

type Props = {
  children: React.ReactNode;
};

export const ActivityStoreProvider: React.FC<Props> = observer(({ children }) => {
  const { currentProfileUserId } = useStore('userStore');
  const [activityStore, setActivityStore] = useState(new ActivityStore());

  useEffect(() => {
    const newStore = new ActivityStore();
    setActivityStore(newStore);
  }, [currentProfileUserId]);

  return (
    <ActivityStoreContext.Provider value={activityStore}>{children}</ActivityStoreContext.Provider>
  );
});
