import React from 'react';
import './App.css';
import {useAuthContext} from './components/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const { auth } = useAuthContext();

  React.useEffect(() => {
    console.log("auth updated to: "+auth);
  }, [auth]);

  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
}

export default App;
