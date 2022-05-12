import React from 'react';
import {useAuthContext} from './AuthContext';

function Home() {
  const { auth } = useAuthContext();

  return <div>This is the Home Component. The auth context value is {auth}</div>
}

export default Home;