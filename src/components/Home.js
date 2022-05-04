import React from 'react';
import AuthContext from './AuthContext';

function Home() {
  const auth = React.useContext(AuthContext);

  return <div>This is the Home Component. The auth context value is {auth}</div>
}

export default Home;