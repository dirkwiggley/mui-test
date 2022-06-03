import React from 'react';
import { useAuthContext } from './components/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import Login from './components/Login';
import Exit from './components/Exit';
import Users from './components/Users';
import Footer from './components/Footer';
import ResetPwd from './components/ResetPwd';
import DBEditor from './components/DBEditor/DBEditor';

function Layout() {
  const { auth } = useAuthContext();

  React.useEffect(() => {
    console.log("auth updated to: " + auth);
  }, [auth]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login showLogin={true} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/resetpassword" element={<ResetPwd />} />
          <Route path="/dbeditor" element={<DBEditor />} />
          <Route path="/exit" element={<Exit />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default Layout;
