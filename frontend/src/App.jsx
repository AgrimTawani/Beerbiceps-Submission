import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Chat, Dashboard } from './pages';
import { Sidebar } from './components';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <Router>
      <div className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen`}>
        <div className="flex">
          <Sidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-1 ml-64 transition-all duration-300 min-h-screen">
            <Routes>
              <Route path="/" element={<Chat isDarkMode={isDarkMode} />} />
              <Route path="/dashboard" element={<Dashboard isDarkMode={isDarkMode}  />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
