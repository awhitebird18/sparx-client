import { Button } from '@/components/ui/Button';
import { PrimaryColors } from '@/features/preferences/enums';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useOnboardingStore } from '../hooks/useOnboardingStore';
import { seedWorkspaceData } from '../api/seedWorkspaceData';
import { useAuth } from '@/providers/contexts/useAuth';
import { ONBOARDING_STEPS } from '../utils/onboardingSteps';
import PrimaryColorPicker from './PrimaryColorPicker';
import ProfileImageSelector from './ProfileImageSelector';
import Header from './Header';

const UserOnboarding = observer(() => {
  const { uploadProfileImageApi } = useStore('userStore');
  const { updatePrimaryColorApi } = useStore('userPreferencesStore');
  const { markUserWorkspaceViewedApi, currentWorkspaceId, lastViewedWorkspace } =
    useStore('workspaceStore');
  const { setStep, setIsLoading, isLoading, selectedColor, selectedImage } = useOnboardingStore();
  const { verifyAndLoginUser } = useAuth();

  const finalizeSetupWorkspaceSetup = async () => {
    if (!lastViewedWorkspace || !currentWorkspaceId) return;
    await markUserWorkspaceViewedApi(lastViewedWorkspace.uuid);
    await seedWorkspaceData(currentWorkspaceId);
    verifyAndLoginUser();
  };

  const handleClickNext = async () => {
    try {
      setStep(ONBOARDING_STEPS.SETUP);
      setIsLoading(true);
      const updatePrimaryColorPromise = updatePrimaryColorApi(selectedColor as PrimaryColors);
      const updateProfileImagePromise = uploadProfileImageApi(selectedImage);
      const finalizeSetupPromise = finalizeSetupWorkspaceSetup();

      await Promise.all([
        updatePrimaryColorPromise,
        updateProfileImagePromise,
        finalizeSetupPromise,
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="prose flex flex-col gap-10 items-center">
      <Header
        title="Create your account"
        description="Enter your profile details. This can be updated later."
      />
      <div className="space-y-8">
        <div className="relative flex flex-col gap-5">
          <ProfileImageSelector />
          <PrimaryColorPicker />
        </div>

        <Button
          size="lg"
          type="submit"
          disabled={isLoading}
          onClick={handleClickNext}
          className={`px-6 w-full ${isLoading && 'opacity-50'}`}
        >
          {isLoading ? 'Saving...' : 'Finallize Setup'}
        </Button>
      </div>
    </div>
  );
});

export default UserOnboarding;
