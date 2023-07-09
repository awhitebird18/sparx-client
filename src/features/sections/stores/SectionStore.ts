import { makeObservable, observable, action } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // import utc plugin
import timezone from 'dayjs/plugin/timezone'; // import timezone plugin
import { Section, CreateSection, UpdateSection } from '@/features/sections';
import { createSection } from '../api/createSection';
import { getSections } from '../api/getSections';

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

  updateSection = (updatedSection: UpdateSection) => {
    const index = this.sections.findIndex(
      (section: Section) => section.uuid === updatedSection.uuid,
    );
    if (index === -1) return null;

    this.sections[index] = { ...this.sections[index], ...updatedSection };
  };

  deleteSection = (uuid: string) => {
    this.sections = this.sections.filter((Section: Section) => Section.uuid !== uuid);
  };

  fetchsections = async () => {
    this.setIsLoading(true);

    const userSections = await getSections();

    this.setSections(userSections);

    this.setIsLoading(false);
  };
}
