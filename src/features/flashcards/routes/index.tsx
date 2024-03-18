import { Navigate, Route, Routes } from 'react-router-dom';
import Templates from '../components/Templates';
import StudyFlashcardsModal from '../components/StudyFlashcardsModal';
import Overview from '../components/Overview';
import Browse from '../components/Browse';
import Stats from '../components/Stats';

const FlashcardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/study" element={<StudyFlashcardsModal />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default FlashcardRoutes;
