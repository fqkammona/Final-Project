import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext'; // Ensure this path is correct
import LoadingPage from './Components/LoadingPage/LoadingPage';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
import HomePage from './Pages/HomePage';
import Background from './Components/LoadingPage/LoadingPage';
import House from './Pages/Home/House';
import Phone from './Pages/Home/Phone';
import Car from './Components/Login-Loading-Page/Car'
import Mountains from './Components/Login-Loading-Page/Mountains';
import FAQpage from './Pages/FAQpage';
import TeamPage from './Pages/Team/TeamPage';
import StoryPage from './Pages/StoryPage';
import NavBar from './Components/NavBar/NavBar';
import UserNavbar from './Components/NavBar/UserNavbar';
import Dashboard from './Pages/LoggedOn/Dashboard';
import Settings from './Pages/LoggedOn/Settings';

const App = () => {
  const [showLoading, setShowLoading] = useState(true);     

  const NavbarContainer = () => {
    const { currentUser } = useAuth(); // Use the useAuth hook here
    return currentUser ? <UserNavbar /> :  <NavBar onGirlCodedClick={handleGirlCodedClick} />;
  };
  
  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 5000); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  const handleGirlCodedClick = () => {
    // Ensure this function is used or remove if not needed.
    setShowLoading(true);
    const timer = setTimeout(() => setShowLoading(false), 20000); // Adjust time as needed
    return () => clearTimeout(timer);
  };

  return (
    <AuthProvider>
      <Router>
        {showLoading ? (
          <LoadingPage />
        ) : (
          <>
            <NavbarContainer /> {/* Use the new NavbarContainer component */}
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
          </>
        )}
      </Router>
    </AuthProvider>
  );
};

export default App;

