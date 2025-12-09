import { AnimatePresence } from 'motion/react';
import { Routes, Route } from 'react-router-dom';
import ParentHome from './pages/ParentHome';
import SymptomChecker from './pages/SymptomChecker';
import NasalWashCalc from './pages/NasalWashCalc';
import ParentInfo from './pages/ParentInfo';
import ParentEmergency from './pages/ParentEmergency';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<ParentHome />} />
          <Route path="/symptoms" element={<SymptomChecker />} />
          <Route path="/nasal-calc" element={<NasalWashCalc />} />
          <Route path="/parent-info" element={<ParentInfo />} />
          <Route path="/emergency-parent" element={<ParentEmergency />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
