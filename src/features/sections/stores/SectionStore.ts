import { makeObservable, observable, action } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // import utc plugin
import timezone from 'dayjs/plugin/timezone'; // import timezone plugin
import { Section, CreateSection, UpdateSection } from '@/features/sections';
import { createSection } from '../api/createSection';
import { getSections } from '../api/getSections';
import { addEventListener } from '@/events/eventHandler';
import { updateSection } from '../api/updateSection';
import { deleteSection } from '../api/deleteSection';

dayjs.extend(utc);
dayjs.extend(timezone);

export class SectionStore {
  sections: Section[] = [];
  isLoading = true;

  constructor() {
    makeObservable(this, {
      sections: observable,
      isLoading: observable,
      createSection: action,
      updateSection: action,
      deleteSection: action,
      fetchsections: action,
      setSections: action,
    });

    addEventListener('channelUpdate', this.fetchsections);
  }

  setSections = (sections: Section[]) => {
    this.sections = sections;
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  createSection = async (newSection: CreateSection) => {
    const Section = await createSection(newSection);
    this.sections.push(Section);
  };

  updateSection = async (sectionId: string, updatedFields: UpdateSection) => {
    const updatedSection = await updateSection(sectionId, updatedFields);

    const index = this.sections.findIndex((section) => section.uuid === sectionId);

    if (index !== -1) {
      this.sections[index] = updatedSection;
    }
  };

  deleteSection = async (sectionId: string) => {
    const res = await deleteSection(sectionId);

    console.log(res);
    this.sections = this.sections.filter((Section: Section) => Section.uuid !== sectionId);
  };

  fetchsections = async () => {
    this.setIsLoading(true);

    const userSections = await getSections();

    this.setSections(userSections);

    this.setIsLoading(false);
  };
}
