import React, { useState } from 'react';
import Logo from '@/components/logo/Logo';
import { Button } from '@/components/ui/Button';

const VerificationSuccess: React.FC = () => {
  const [tourStep, setTourStep] = useState(1);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Logo size={20} />
        <h2 className="mt-6 text-center text-3xl font-extrabold">Verification Successful!</h2>
        <p className="text-center mt-4 text-gray-600">
          You are now logged in and ready to start messaging your team!
        </p>
      </div>

      {tourStep === 1 && (
        <div className="absolute top-2 right-2 p-4 border border-border rounded bg-background flex flex-col gap-4">
          <p>Update your profile here!</p>
          <div className="gap-2 flex ml-auto">
            <Button
              onClick={() => setTourStep((prev) => (prev += 1))}
              className="w-16 bg-userMedium hover:bg-userDark text-white"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {tourStep === 2 && (
        <div className="absolute top-2 left-2 p-4 border border-border rounded bg-background flex flex-col gap-4">
          <p>To connect with one of your teams, click on the users tab</p>
          <div className="gap-2 flex ml-auto">
            <Button
              onClick={() => setTourStep((prev) => (prev -= 1))}
              variant="outline"
              size="sm"
              className="w-16"
            >
              Back
            </Button>
            <Button
              onClick={() => setTourStep((prev) => (prev += 1))}
              className="w-16 bg-userMedium hover:bg-userDark text-white"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {tourStep === 3 && (
        <div className="absolute top-10 left-2 p-4 border border-border rounded bg-background flex flex-col gap-4">
          <p>To view and participate in company channels (discussion boards), click here</p>
          <div className="gap-2 flex ml-auto">
            <Button
              onClick={() => setTourStep((prev) => (prev -= 1))}
              variant="outline"
              size="sm"
              className="w-16"
            >
              Back
            </Button>
            <Button
              onClick={() => setTourStep((prev) => (prev += 1))}
              className="w-16 bg-userMedium hover:bg-userDark text-white"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {tourStep === 4 && (
        <div className="absolute top-36 left-2 p-4 border border-border rounded bg-background flex flex-col gap-4">
          <p>All of your currently subscribed channels, will be listed here</p>
          <div className="gap-2 flex ml-auto">
            <Button
              onClick={() => setTourStep((prev) => (prev -= 1))}
              variant="outline"
              size="sm"
              className="w-16"
            >
              Back
            </Button>
            <Button
              onClick={() => setTourStep((prev) => (prev += 1))}
              className="w-16 bg-userMedium hover:bg-userDark text-white"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {tourStep === 5 && (
        <div className="absolute top-56 left-2 p-4 border border-border rounded bg-background flex flex-col gap-4">
          <p>and all of your private conversations will be listed here</p>
          <div className="gap-2 flex ml-auto">
            <Button
              onClick={() => setTourStep((prev) => (prev -= 1))}
              variant="outline"
              size="sm"
              className="w-16"
            >
              Back
            </Button>
            <Button
              onClick={() => setTourStep((prev) => (prev += 1))}
              className="w-16 bg-userMedium hover:bg-userDark text-white"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Optionally, if you have more steps, you can keep adding similar conditional render blocks based on the tourStep state */}
    </div>
  );
};

export default VerificationSuccess;
