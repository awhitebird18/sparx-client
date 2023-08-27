import { makeObservable, observable, action, computed } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { addEventListener } from '@/events/eventHandler';
import { CreateSection, Section, UpdateSection } from '@/features/sections/types';
import sectionsApi from '../api';
import { SectionTypes } from '../enums';

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
      removeSection: action,
      setSections: action,
      setIsLoading: action,
      addSection: action,
      createSectionApi: action,
      updateSectionApi: action,
      removeSectionApi: action,
      fetchsectionsApi: action,
      addChannelUuidToSection: action,
      removeChannelUuidFromSection: action,
      directChannelSectionId: computed,
    });

    addEventListener('channelUpdate', this.fetchsectionsApi);
  }

  get directChannelSectionId() {
    return this.sections.find((section: Section) => section.type === SectionTypes.DIRECT)?.uuid;
  }

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  setSections = (sections: Section[]) => {
    this.sections = sections;
  };

  findSectionByUuid = (uuid: string) => {
    return this.sections.find((section: Section) => section.uuid === uuid);
  };

  addSection = (section: Section) => {
    const sectionFound = this.findSectionByUuid(section.uuid);
    if (sectionFound) return;

    this.sections.push(section);
  };

  updateSection = (section: Section) => {
    const index = this.sections.findIndex((el: Section) => el.uuid === section.uuid);
    if (index === -1) return;

    this.sections.splice(index, 1, section);
  };

  removeSection = async (sectionId: string) => {
    this.sections = this.sections.filter((Section: Section) => Section.uuid !== sectionId);
  };

  createSectionApi = async (createSection: CreateSection) => {
    const section = await sectionsApi.createSection(createSection);

    this.addSection(section);
  };

  findSectionByChannelType = (channelType: SectionTypes) => {
    return this.sections.find((el: Section) => el.type === channelType);
  };

  addChannelUuidToSection = (channelUuid: string, sectionUuid: string) => {
    const section = this.findSectionByUuid(sectionUuid);

    if (!section || section?.channelIds?.find((el: string) => el === channelUuid)) return;

    section.channelIds.push(channelUuid);

    this.updateSection(section);
  };

  removeChannelUuidFromSection = (channelUuid: string) => {
    for (let i = 0; i < this.sections.length; i++) {
      const channelExists = this.sections[i].channelIds.find((el: string) => el === channelUuid);

      if (channelExists) {
        this.sections[i].channelIds = this.sections[i].channelIds.filter(
          (el: string) => el !== channelUuid,
        );
      }
    }
  };

  updateSectionApi = async (sectionUuid: string, updateSection: UpdateSection) => {
    const section = await sectionsApi.updateSection(sectionUuid, updateSection);

    this.updateSection(section);
  };

  updateChannelSectionApi = async (sectionUuid: string, channelUuid: string) => {
    await sectionsApi.updateChannelSection(channelUuid, sectionUuid);

    this.removeChannelUuidFromSection(channelUuid);

    this.addChannelUuidToSection(channelUuid, sectionUuid);
  };

  removeSectionApi = async (sectionUuid: string) => {
    await sectionsApi.removeSection(sectionUuid);

    this.removeSection(sectionUuid);
  };

  fetchsectionsApi = async () => {
    this.setIsLoading(true);

    const userSections = await sectionsApi.getSections();

    this.setSections(userSections);

    this.setIsLoading(false);
  };
}
