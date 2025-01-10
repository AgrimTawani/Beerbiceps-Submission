import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Chat, Dashboard } from './pages';
import { Sidebar } from './components';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 transition-all duration-300 bg-black min-h-screen">
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;