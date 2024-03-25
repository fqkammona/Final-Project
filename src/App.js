import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import LoadingPage from './Components/LoadingPage/LoadingPage';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
import HomePage from './Pages/HomePage';
import FAQpage from './Pages/FAQpage';
import TeamPage from './Pages/Team/TeamPage';
import StoryPage from './Pages/StoryPage';
import NavBar from './Components/NavBar/NavBar';
import UserNavbar from './Components/NavBar/UserNavbar';
import Dashboard from './Pages/LoggedOn/Dashboard';
import Settings from './Pages/LoggedOn/Settings';
import './App.css'; // Make sure to include the CSS file for animations

const App = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false); // New state to manage content visibility
  
  useEffect(() => {
    // Start fading in the homepage before hiding the loading page
    const contentTimer = setTimeout(() => {
      setContentVisible(true); // Begin fading in the homepage
    }, 19001); // Adjust timing as needed

    const loadingTimer = setTimeout(() => {
      setShowLoading(false); // Hide loading page after a delay
    }, 19000); // Ensure this is longer than the contentTimer

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  const NavbarContainer = () => {
    const { currentUser } = useAuth();
    return currentUser ? <UserNavbar /> : <NavBar />;
  };

  return (
    <AuthProvider>
      <Router>
        {showLoading ? (
          <div className={contentVisible ? 'fade-out' : ''}>
            <LoadingPage />
          </div>
        ) : (
          <div className="fade-in">
            <NavbarContainer />
            <Routes>
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/frequently-asked-questions" element={<FAQpage />} />
              <Route path="/meet-the-team" element={<TeamPage />} />
              <Route path="/our-story" element={<StoryPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        )}
      </Router>
    </AuthProvider>
  );
};

export default App;
