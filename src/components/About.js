import React from 'react';
import AuthContext from './AuthContext';

function About() {
  const auth = React.useContext(AuthContext);

  return <div>This is the About Component. The auth context value is {auth}</div>
}

export default About;