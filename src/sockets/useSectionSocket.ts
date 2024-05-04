import { Section } from '@/features/sections/types';
import { useStore } from '@/stores/RootStore';
import { useEffect, useMemo } from 'react';

const useSectionSocket = () => {
  const { connectSocket } = useStore('socketStore');
  const { addSection, updateSection, removeSection, setSections } = useStore('sectionStore');

  const listeners = useMemo(
    () => [
      {
        event: 'new-section',
        callback: (data: { payload: { section: Section } }) => addSection(data.payload.section),
      },
      {
        event: 'update-section',
        callback: (data: { payload: { section: Section } }) => updateSection(data.payload.section),
      },
      {
        event: 'remove-section',
        callback: (data: { payload: { sectionId: string } }) =>
          removeSection(data.payload.sectionId),
      },
      {
        event: 'user-sections',
        callback: (data: { payload: { sections: Section[] } }) =>
          setSections(data.payload.sections),
      },
    ],
    [addSection, removeSection, setSections, updateSection],
  );

  useEffect(() => {
    const cleanupFunctions = listeners.map((listener) =>
      connectSocket(listener.event, listener.callback),
    );

    return () => cleanupFunctions.forEach((cleanup) => cleanup?.());
  }, [connectSocket, listeners]);

  return null;
};

export default useSectionSocket;
