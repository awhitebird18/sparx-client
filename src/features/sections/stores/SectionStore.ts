import { makeAutoObservable } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { CreateSection, Section, UpdateSection } from '@/features/sections/types';
import sectionsApi from '../api';

dayjs.extend(utc);
dayjs.extend(timezone);

export class SectionStore {
  sections: Section[] = [];
  isLoading = true;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  // Computed Values
  get sortedSections() {
    return this.sections.slice().sort((a: Section, b: Section) => a.orderIndex - b.orderIndex);
  }

  // Crud Operations
  addSection = (section: Section) => {
    const sectionFound = this.findSectionByUuid(section.uuid);
    if (sectionFound) return;
    this.sections.push(section);
  };

  updateSection(section: Section) {
    const sectionFound = this.findSectionByUuid(section.uuid);
    if (!sectionFound) return;
    Object.assign(sectionFound, section);
  }

  removeSection(sectionId: string) {
    this.sections = this.sections.filter((Section: Section) => Section.uuid !== sectionId);
  }

  setSections = (sections: Section[]) => {
    this.sections = sections;
  };

  findSectionByUuid = (uuid: string) => {
    return this.sections.find((section: Section) => section.uuid === uuid);
  };

  findDefaultSection() {
    return this.sections.find((el: Section) => el.isDefault);
  }

  addChannelUuidToSection(channelUuid: string, sectionUuid: string) {
    const section = this.findSectionByUuid(sectionUuid);
    if (!section || section?.channelIds?.find((el: string) => el === channelUuid)) return;
    section.channelIds.push(channelUuid);
    this.updateSection(section);
  }

  removeChannelUuidFromSection(channelUuid: string) {
    for (let i = 0; i < this.sections.length; i++) {
      const channelExists = this.sections[i].channelIds.find((el: string) => el === channelUuid);

      if (channelExists) {
        this.sections[i].channelIds = this.sections[i].channelIds.filter(
          (el: string) => el !== channelUuid,
        );
      }
    }
  }

  // API Interaction Methods
  async fetchsectionsApi() {
    this.setIsLoading(true);
    try {
      const userSections = await sectionsApi.getSections();
      this.setSections(userSections);
    } catch (error) {
      console.error('Failed to fetch sections:', error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async updateSectionApi(sectionUuid: string, updateSection: UpdateSection) {
    try {
      const section = await sectionsApi.updateSection(sectionUuid, updateSection);
      this.updateSection(section);
    } catch (error) {
      console.error('Failed to create section:', error);
    }
  }

  async updateChannelSectionApi(sectionUuid: string, channelUuid: string) {
    try {
      await sectionsApi.updateChannelSection(channelUuid, sectionUuid);
      this.removeChannelUuidFromSection(channelUuid);
      this.addChannelUuidToSection(channelUuid, sectionUuid);
    } catch (error) {
      console.error('Failed to update section:', error);
    }
  }

  async removeSectionApi(sectionUuid: string) {
    try {
      await sectionsApi.removeSection(sectionUuid);
      this.removeSection(sectionUuid);
    } catch (error) {
      console.error('Failed to delete section:', error);
    }
  }

  async createSectionApi(createSection: CreateSection) {
    try {
      const section = await sectionsApi.createSection(createSection);
      this.addSection(section);
    } catch (error) {
      console.error('Failed to create section:', error);
    }
  }

  // May use this for shortcut key of moving a section
  async moveSectionApi(
    sectionA: { index: number; id: string },
    sectionB: { index: number; id: string },
  ) {
    try {
      // await sectionsApi.moveSection({ sectionId1: sectionA.id, sectionId2: sectionB.id });
      const sectionAFound = this.findSectionByUuid(sectionA.id);
      const sectionBFound = this.findSectionByUuid(sectionB.id);
      if (!sectionAFound || !sectionBFound) return;
      sectionAFound.orderIndex = sectionB.index;
      sectionBFound.orderIndex = sectionA.index;
      this.updateSection(sectionAFound);
      this.updateSection(sectionBFound);
    } catch (error) {
      console.error('Failed to move section:', error);
    }
  }

  reorderSections = async (draggedSectionId: string, newPosition: number) => {
    try {
      // Find the section that is being dragged
      const draggedSection = this.sections.find((section) => section.uuid === draggedSectionId);
      if (!draggedSection) throw new Error(`Section with ID ${draggedSectionId} not found`);
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
    } catch (error) {
      console.error('Failed to reorder sections:', error);
    }
  };

  // Ui Handling
  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };
}
