import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext'; // Ensure this path is correct
import LoadingPage from './Components/LoadingPage/LoadingPage';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
import HomePage from './Pages/HomePage';
import FAQpage from './Pages/FAQpage';
import TeamPage from './Pages/Team/TeamPage';
import StoryPage from './Pages/StoryPage';
import NavBar from './Components/NavBar/Navbar';
import UserNavbar from './Components/NavBar/UserNavbar';
import Dashboard from './Pages/LoggedOn/Dashboard';

// Define a new component that will determine which Navbar to show

const App = () => {
  const [showLoading, setShowLoading] = useState(true);     

  const NavbarContainer = () => {
    const { currentUser } = useAuth(); // Use the useAuth hook here
    return currentUser ? <UserNavbar /> :  <NavBar onGirlCodedClick={handleGirlCodedClick} />;
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  const handleGirlCodedClick = () => {
    // Ensure this function is used or remove if not needed.
    setShowLoading(true);
    const timer = setTimeout(() => setShowLoading(false), 5000); // Adjust time as needed
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
            </Routes>
          </>
        )}
      </Router>
    </AuthProvider>
  );
};

export default App;
