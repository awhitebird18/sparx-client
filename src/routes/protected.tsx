import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

import { AppLayout } from '@/components/layout/AppLayout';

const UserRoutes = lazy(() => import('@/features/users/routes'));
const ChannelRoutes = lazy(() => import('@/features/channels/routes'));
const MentionRoutes = lazy(() => import('@/features/mentions/routes'));
const DraftRoutes = lazy(() => import('@/features/drafts/routes'));
const ChatroomRoutes = lazy(() => import('@/features/chatroom/routes'));

export const protectedRoutes = [
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { path: 'users', element: <UserRoutes /> },
      { path: 'channels', element: <ChannelRoutes /> },
      { path: 'mentions', element: <MentionRoutes /> },
      { path: 'drafts', element: <DraftRoutes /> },
      { path: ':channelId/*', element: <ChatroomRoutes /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
