import { useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';

function About() {
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
  }, [auth]);

  const rolesStr = roles ? JSON.stringify(roles, null, 2) : "none";
  const out = `This user has roles: ${rolesStr}`;
  return <div>{out}</div>
}

export default About;