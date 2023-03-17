import { Routes, Route } from 'react-router-dom';
import HeroSection from './components/hero/HeroSection';
import Header from './components/header/Header';
import SearchField from './components/searchSection/SearchField';
import PollutionData from './components/pollutionDataPage/PollutionData';

function App() {
  return (
    <div className="w-full h-fit text-white">

      <Header />
      <HeroSection />
      <Routes>
        <Route exact path="/" element={<SearchField />} />
        <Route exact path="/country/:id" element={<SearchField />} />
        <Route path="/pollution/:id" element={<PollutionData />} />
      </Routes>
    </div>
  );
}

export default App;
