import { useState, useEffect } from 'react';
import {useAuthContext} from './AuthContext';
import { Box } from '@mui/material';
import { LIGHTEST_BLUE } from '../colors';

function Home() {
  const [roles, setRoles] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const { auth } = useAuthContext();

  useEffect(() => {
    if (auth && auth !== "") {
      try {
        let authObj = JSON.parse(auth);
        let roles = authObj ? authObj.roles : null;
        let isAdmin = roles ? roles.includes("ADMIN") : null;
        setRoles(roles);
        setIsAdmin(isAdmin);
      } catch (err) {
        console.error(err);
        setRoles([]);
        setIsAdmin(false);
      }
    }
  }, [auth, setRoles, setIsAdmin]);

  return <Box sx={{ backgroundColor: LIGHTEST_BLUE }}>Home page</Box>
}

export default Home;