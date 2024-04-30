import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Notifications from './Pages/LoggedOn/Notifications';
import EventsPage from './Pages/LoggedOn/EventsPage';
import LiveFeed from './Pages/LoggedOn/LiveFeed';
import Settings from './Pages/LoggedOn/Settings/Settings';
import VideoLogs from './Pages/LoggedOn/VideoLogs';
import './App.css';

const LogoutOnAccess = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
      if (currentUser && ['/home', '/frequently-asked-questions', '/meet-the-team', '/our-story', '/signup'].includes(location.pathname)) {
          logout(); // Automatically logout if user navigates to these pages
      }
  }, [location, currentUser, logout]); // Dependencies to trigger the effect

  return children;
};

const App = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  
  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setContentVisible(true);
    }, 3000);

    const loadingTimer = setTimeout(() => {
      setShowLoading(false);
    }, 3001);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  const PrivateRoute = ({ element: Component, ...rest }) => {
    const { currentUser } = useAuth();
    return currentUser ? <Component {...rest} /> : <Navigate to="/login" />;
  };

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
          <LogoutOnAccess> {/* Wrap routes with the logout checker */}
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
                  <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
                  <Route path="/live-feed" element={<PrivateRoute element={LiveFeed} />} />
                  <Route path="/settings" element={<PrivateRoute element={Settings} />} />
                  <Route path="/notifications" element={<PrivateRoute element={Notifications} />} />
                  <Route path="/events-page" element={<PrivateRoute element={EventsPage} />} />
                  <Route path="/video-logs" element={<PrivateRoute element={VideoLogs} />} />
              </Routes>
          </div>
      </LogoutOnAccess>
        )}
      </Router>
    </AuthProvider>
  );
};

export default App;
