import { lazy } from 'react';
const AddFlashcardModal = lazy(() => import('@/features/flashcards/components/AddFlashcardModal'));
const Browse = lazy(() => import('@/features/flashcards/components/Browse'));
const Stats = lazy(() => import('@/features/flashcards/components/Stats'));
const StudyFlashcardsModal = lazy(
  () => import('@/features/flashcards/components/StudyFlashcardsModal'),
);
const Templates = lazy(() => import('@/features/flashcards/components/Templates'));
const Note = lazy(() => import('@/features/notes/components/Note'));
const Profile = lazy(() => import('@/features/profile/components/Profile'));

export { AddFlashcardModal, Browse, Stats, StudyFlashcardsModal, Templates, Note, Profile };
