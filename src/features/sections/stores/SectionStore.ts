import { makeObservable, observable, action, computed } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // import utc plugin
import timezone from 'dayjs/plugin/timezone'; // import timezone plugin
import { Section, UpdateSection } from '@/features/sections';
import { getSections } from '../api/getSections';
import { addEventListener } from '@/events/eventHandler';
import { SectionTypes } from '../types/sectionEnums';

dayjs.extend(utc);
dayjs.extend(timezone);

export class SectionStore {
  sections: Section[] = [];
  isLoading = true;

  constructor() {
    makeObservable(this, {
      sections: observable,
      isLoading: observable,
      updateSection: action,
      deleteSection: action,
      fetchsections: action,
      setSections: action,
      setIsLoading: action,
      addSection: action,
      handleUpdateSectionSocket: action,
      directChannelSectionId: computed,
    });

    addEventListener('channelUpdate', this.fetchsections);
  }

  get directChannelSectionId() {
    return this.sections.find((section: Section) => section.type === SectionTypes.DIRECT)?.uuid;
  }

  setSections = (sections: Section[]) => {
    this.sections = sections;
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  findSection = (id: string) => {
    return this.sections.find((section: Section) => section.uuid === id);
  };

  addSection = (section: Section) => {
    const sectionFound = this.findSection(section.uuid);

    if (sectionFound) return;

    this.sections.push(section);
  };

  updateSection = (sectionId: string, updatedFields: UpdateSection) => {
    const section = this.findSection(sectionId);

    if (section) {
      Object.assign(section, updatedFields);
    }
  };

  handleUpdateSectionSocket = (updatedSection: Section) => {
    this.updateSection(updatedSection.uuid, updatedSection);
  };

  deleteSection = async (sectionId: string) => {
    this.sections = this.sections.filter((Section: Section) => Section.uuid !== sectionId);
  };

  fetchsections = async () => {
    this.setIsLoading(true);

    const userSections = await getSections();

    this.setSections(userSections);

    this.setIsLoading(false);
  };
}
