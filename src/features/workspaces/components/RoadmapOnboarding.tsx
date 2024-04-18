import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { Magic, Map } from 'react-bootstrap-icons';
import paths from '@/assets/images/paths.png';
import GenerateRoadmap from '@/features/workspaces/components/GenerateRoadmap';

const RoadmapOnboarding = ({ setStep }: { setStep: (val: number) => void }) => {
  const [showRoadmap, setShowRoadmap] = useState(false);

  const handleSubmit = async () => {
    setStep(3);
  };

  const handleShowRoadmapModal = () => {
    setShowRoadmap(true);
  };

  if (showRoadmap) {
    return <GenerateRoadmap setStep={setStep} />;
  }

  return (
    <div className="prose flex flex-col items-center gap-8">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-main">Roadmap</h2>
        <p className="text-secondary">
          This will be the shared roadmap for you workspace. It should be a broad topics such as
          "Frotend Development" or "Nursing".
        </p>
        <div className="flex gap-12 items-center w-[65rem] h-[32rem] mt-6">
          <div className="flex flex-col gap-3 items-center w-1/2  h-full">
            <img src={paths} className="object-cover h-full opacity-80 rounded-2xl" />
          </div>
          <div className="flex flex-col gap-6 w-1/2 h-full prose dark:prose-invert">
            <p className="text-left text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ex placeat ipsam aut
              quam similique.
            </p>
            <p className="text-left text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className="text-left text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ex placeat ipsam aut
              quam similique.
            </p>
            <p className="text-left text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ex placeat ipsam aut
              quam similique.
            </p>

            <div className="h-full flex justify-between gap-6">
              <Button
                className="flex-col items-center h-full w-full gap-4"
                onClick={handleSubmit}
                variant="outline"
              >
                <Map size={36} /> <p className="h-10 text-lg">Nah, I will start from scratch</p>
              </Button>
              <Button
                className="flex-col items-center h-full w-full gap-4"
                onClick={handleShowRoadmapModal}
              >
                <Magic size={36} />
                <p className="h-10 text-lg">Yes, please generate me a roadmap</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-8 items-center"></div>
    </div>
  );
};

export default RoadmapOnboarding;
