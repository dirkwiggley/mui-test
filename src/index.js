import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import Login from './components/Login';
import Exit from './components/Exit';
import Footer from './components/Footer';

import { AuthProvider } from './components/AuthContext';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Router>
      {/* <App /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login showLogin={true}/>} />
        <Route path="/exit" element={<Exit />} />
      </Routes>
    </Router>
    <Footer />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
