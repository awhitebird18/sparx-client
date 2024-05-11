import React from 'react';
import { observer } from 'mobx-react-lite';
import { NodemapStoreContext } from '../hooks/useNodemapStore';
import { NodemapStore } from '../stores/NodemapStore';
import NodeMap from '../components/Nodemap';

export const NodemapStoreProvider: React.FC<{ readonly?: boolean }> = observer(
  ({ readonly = false }) => {
    const nodemapStore = new NodemapStore();

    return (
      <NodemapStoreContext.Provider value={nodemapStore}>
        <NodeMap readonly={readonly} />
      </NodemapStoreContext.Provider>
    );
  },
);
