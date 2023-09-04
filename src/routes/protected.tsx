import { Suspense, lazy } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import MainLayout from '@/components/layout/MainLayout';
import VerificationSuccess from '@/features/auth/components/VerificationSuccess';
import ThreadRoutes from '@/features/threads/routes';

const UserRoutes = lazy(() => import('@/features/users/routes'));
const ChannelRoutes = lazy(() => import('@/features/channels/routes'));
const MentionRoutes = lazy(() => import('@/features/mentions/routes'));
const DraftRoutes = lazy(() => import('@/features/drafts/routes'));
const ChatroomRoutes = lazy(() => import('@/features/chatroom/routes'));

const App = () => {
  return (
    <MainLayout>
      <Suspense>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: 'users/*', element: <UserRoutes /> },
      { path: 'verification-success', element: <VerificationSuccess /> },
      { path: 'channels/*', element: <ChannelRoutes /> },
      { path: 'mentions/*', element: <MentionRoutes /> },
      { path: 'drafts/*', element: <DraftRoutes /> },
      { path: 'threads/*', element: <ThreadRoutes /> },
      { path: ':channelId/*', element: <ChatroomRoutes /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
