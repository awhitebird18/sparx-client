import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';

const useSectionSocket = () => {
  const { connectSocket } = useStore('socketStore');
  const { addSection, updateSection, removeSection, setSections } = useStore('sectionStore');

  // New section
  useEffect(() => {
    return connectSocket('new-section', (data) => {
      const { section } = data.payload;

      addSection(section);
    });
  }, [connectSocket, addSection]);

  useEffect(() => {
    return connectSocket('user-sections', (data) => {
      const { sections } = data.payload;

      setSections(sections);
    });
  }, [connectSocket, setSections]);

  // Update section
  useEffect(() => {
    return connectSocket('update-section', (data) => {
      const { section } = data.payload;

      delete section.channelIds;

      updateSection(section);
    });
  }, [connectSocket, updateSection]);

  // Remove section
  useEffect(() => {
    return connectSocket('remove-section', removeSection);
  }, [connectSocket, removeSection]);

  return null;
};

export default useSectionSocket;
