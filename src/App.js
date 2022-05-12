import React from 'react';
import './App.css';
import {useAuthContext} from './components/AuthContext';

function App() {
  const { auth } = useAuthContext();

  React.useEffect(() => {
    console.log("auth updated to: "+auth);
  }, [auth]);

  return (
    <>
    </>
  );
}

export default App;
