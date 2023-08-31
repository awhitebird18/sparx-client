import { makeObservable, observable, action, computed } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { CreateSection, Section, UpdateSection } from '@/features/sections/types';
import sectionsApi from '../api';
import { ChannelType } from '@/features/channels/enums';

dayjs.extend(utc);
dayjs.extend(timezone);

export class SectionStore {
  sections: Section[] = [];
  isLoading = true;

  constructor() {
    makeObservable(this, {
      sections: observable,
      isLoading: observable,
      sortedSections: computed,
      updateSection: action,
      removeSection: action,
      setSections: action,
      setIsLoading: action,
      addSection: action,
      reorderSections: action,
      createSectionApi: action,
      updateSectionApi: action,
      removeSectionApi: action,
      fetchsectionsApi: action,
      addChannelUuidToSection: action,
      removeChannelUuidFromSection: action,
      directChannelSectionId: computed,
    });
  }

  get directChannelSectionId() {
    return this.sections.find((section: Section) => section.type === ChannelType.DIRECT)?.uuid;
  }

  get sortedSections() {
    return this.sections.slice().sort((a: Section, b: Section) => a.orderIndex - b.orderIndex);
  }

  reorderSections = async (draggedSectionId: string, newPosition: number) => {
    // Find the section that is being dragged
    const draggedSection = this.sections.find((section) => section.uuid === draggedSectionId);

    if (!draggedSection) {
      console.error(`Could not find section with id ${draggedSectionId}`);
      return;
    }

    // Remove the dragged section from its current position
    this.sections = this.sections.filter((section) => section.uuid !== draggedSectionId);

    // Insert it into its new position
    this.sections.splice(newPosition, 0, draggedSection);

    // Optionally, you can update the `orderIndex` for all items to reflect the new order
    this.sections = [...this.sections.map((s, i) => ({ ...s, orderIndex: i }))];

    const sectionOrderIndexs = this.sections.map((s: Section) => ({
      uuid: s.uuid,
      orderIndex: s.orderIndex,
    }));

    const sections = await sectionsApi.updateSectionOrder(sectionOrderIndexs);

    this.setSections(sections);
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  setSections = (sections: Section[]) => {
    this.sections = sections.sort((a: Section, b: Section) => a.orderIndex - b.orderIndex);
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
    const sectionFound = this.findSectionByUuid(section.uuid);

    if (!sectionFound) return;

    Object.assign(sectionFound, section);
  };

  removeSection = async (sectionId: string) => {
    this.sections = this.sections.filter((Section: Section) => Section.uuid !== sectionId);
  };

  createSectionApi = async (createSection: CreateSection) => {
    const section = await sectionsApi.createSection(createSection);

    this.addSection(section);
  };

  // May use this for shortcut key of moving a section
  moveSectionApi = async (
    sectionA: { index: number; id: string },
    sectionB: { index: number; id: string },
  ) => {
    // await sectionsApi.moveSection({ sectionId1: sectionA.id, sectionId2: sectionB.id });

    const sectionAFound = this.findSectionByUuid(sectionA.id);
    const sectionBFound = this.findSectionByUuid(sectionB.id);

    if (!sectionAFound || !sectionBFound) return;

    sectionAFound.orderIndex = sectionB.index;
    sectionBFound.orderIndex = sectionA.index;

    this.updateSection(sectionAFound);
    this.updateSection(sectionBFound);
  };

  findSectionByChannelType = (channelType: ChannelType) => {
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
