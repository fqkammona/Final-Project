import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingPage from './Components/LoadingPage/LoadingPage';
import Login from './Components/Login/Login'
import Signup from './Components/Login/Signup'
import HomePage from './Pages/HomePage';
import FAQpage from './Pages/FAQpage';
import TeamPage from './Pages/Team/TeamPage';
import StoryPage from './Pages/StoryPage';
import NavBar from './Components/NavBar/Navbar';
import Dashboard from './Pages/LoggedOn/Dashboard'

const App = () => {
  const [showLoading, setShowLoading] = useState(true); // State to control the display of the loading page

  // Effect for initial loading
  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 5000); // Change 6000 to the duration you want for the loading screen
    return () => clearTimeout(timer);
  }, []);

  // Handler for when "GIRL CODED" is clicked
  const handleGirlCodedClick = () => {
    setShowLoading(true); // Show the loading page
    const timer = setTimeout(() => setShowLoading(false), 5000); // Then hide it after a delay
    return () => clearTimeout(timer);
  };

  return (
    <Router>
      {showLoading && <LoadingPage />}
      {!showLoading && (
        <>
          <NavBar onGirlCodedClick={handleGirlCodedClick} />
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/frequently-asked-questions" element={<FAQpage />} />
            <Route path="/meet-the-team" element={<TeamPage />} />
            <Route path="/our-story" element={<StoryPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;
