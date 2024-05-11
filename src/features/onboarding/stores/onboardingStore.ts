import { PrimaryColors, Theme } from '@/features/preferences/enums';
import { getAvatarUrl } from '@/features/workspaces/utils/avatarUrls';
import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { ONBOARDING_STEPS } from '../utils/onboardingSteps';

export class OnboardingStore {
  isLoading = false;
  step: number = ONBOARDING_STEPS.CREATE_WORKSPACE;
  selectedTheme: Theme = Theme.LIGHT;
  selectedColor: string = PrimaryColors.BLUE;
  selectedImage: string = getAvatarUrl();
  workspaceImage = '';

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  setIsLoading(val: boolean) {
    this.isLoading = val;
  }

  setStep(step: number) {
    this.step = step;
  }

  setSelectedTheme(theme: Theme) {
    this.selectedTheme = theme;
  }

  setSelectedColor(color: string) {
    this.selectedColor = color;
  }

  setSelectedImage(image: string) {
    this.selectedImage = image;
  }

  setWorkspaceImage(image: string) {
    this.workspaceImage = image;
  }

  generateAvatar = async () => {
    const url = getAvatarUrl();

    try {
      const response = await axios.get(url, { responseType: 'text' });
      if (response.status !== 200) {
        throw new Error(`Failed to fetch avatar: ${response.statusText}`);
      }
      const svgData = encodeURIComponent(response.data).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16)),
      );
      const base64EncodedData = btoa(svgData);
      const svgDataUrl = `data:image/svg+xml;base64,${base64EncodedData}`;
      this.setSelectedImage(svgDataUrl);
    } catch (error) {
      console.error('Error generating avatar:', error);
    }
  };
}
