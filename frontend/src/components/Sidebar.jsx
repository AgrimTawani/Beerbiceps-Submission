/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ChevronLeft, ChevronRight, LayoutDashboard, MessageSquare, Moon, Sun } from 'lucide-react';

const Sidebar = ({ isDarkMode, toggleDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} fixed left-0 top-0 transition-all duration-300 border-r border-gray-800`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-purple-600 text-white p-1 rounded-full hover:bg-purple-700 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight size={16} />
        ) : (
          <ChevronLeft size={16} />
        )}
      </button>

      {/* User Profile Section */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
        <div className="flex items-center gap-3">
          <div className={` ${isDarkMode ? 'bg-gray-800' : 'bg-slate-300'} p-2 rounded-full`}>
            <User size={24} className="text-purple-500" onClick={() => navigate('/')} />
          </div>
          {!isCollapsed && (
            <div className={`text-white ${!isDarkMode ? 'text-black' : ''}`}>
              <h3 className="font-medium">Username</h3>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="mt-4 px-2">
        {/* Dashboard Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className={`w-full flex items-center gap-3 p-3 text-gray-300 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}  rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LayoutDashboard size={20} className="text-purple-500" />
          {!isCollapsed && <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Dashboard</span>
        }
        </button>

        {/* Chatbot Button */}
        <button
          onClick={() => navigate('/')}
          className={`w-full flex items-center gap-3 p-3 text-gray-300 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}  rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <MessageSquare size={20} className="text-purple-500" />
          {!isCollapsed && <span className={`${isDarkMode ? 'text-white' : 'text-black '}`}>Chatbot</span>}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`w-full flex items-center gap-3 p-3 text-gray-300 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          {isDarkMode ? (
            <Sun size={20} className="text-yellow-500" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
          {!isCollapsed && <span className={`${isDarkMode ? 'text-white' : 'text-black'}`} >{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
