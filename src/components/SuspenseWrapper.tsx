import { ReactNode, Suspense } from 'react';
import Spinner from './ui/Spinner';

const SuspenseWrapper = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    }
  >
    {children}
  </Suspense>
);

export default SuspenseWrapper;
