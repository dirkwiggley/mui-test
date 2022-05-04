import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import SetContext from './components/SetContext';

function App() {
  const [auth, setAuth] = React.useState("dummy value");

  React.useEffect(() => {
    console.log("auth updated to: "+auth);
  }, [auth]);

  const changeAuth = (value) => {
    setAuth(value);
  }

  return (
    <>
      <AuthProvider value={auth}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/setcontext" element={<SetContext setAuth={changeAuth} />} />
          </Routes>
        </Router>
        <footer>This is the footer</footer>
      </AuthProvider>
    </>
  );
}

export default App;
