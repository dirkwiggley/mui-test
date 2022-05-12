import React from 'react';
import {useAuthContext} from './AuthContext';

function About() {
  const { auth } = useAuthContext();

  return <div>This is the About Component. The auth context value is {auth}</div>
}

export default About;