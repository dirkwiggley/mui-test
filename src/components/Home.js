import { useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { Box } from '@mui/material';

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

  return ( 
    <Box sx={{ bgcolor: "background.lightestBlue", pl: 2, pt: 2 }}>
      <Box sx={{ height: "100%", flex: 1 }}>
        Home page
      </Box>
    </Box> )
}

export default Home;