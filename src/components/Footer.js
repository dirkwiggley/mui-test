import { useEffect, useState } from 'react';
import { Box, Paper } from "@mui/material";
import { useAuthContext } from './AuthContext';

const boxStyle = {
  width: '100%',
  bottom: 0,
  position: "absolute"
};

const paperStyle = {
  backgroundColor: "primary.main"
}

function Footer() {
  const [login, setLogin] = useState(null);
  const [nickname, setNickname] = useState(null);

  const { auth } = useAuthContext();

  useEffect(() => {
    if (auth && auth !== "") {
      try {
        let authObj = JSON.parse(auth);
        let login = authObj ? authObj.login : null;
        let nickname = authObj ? authObj.nickname : null;
        setLogin(login);
        setNickname(nickname);
      } catch (err) {
        console.error(err);
        setLogin(null);
        setNickname(null);
      }
    }
  }, [auth, setLogin, setNickname]);

  const out = `User: ${login} (${nickname})`;
  
  return (
    <footer>
      <Box sx={{ ...boxStyle }} >
        <Paper sx={{ ...paperStyle}}>
          {login ? out : "-"}
        </Paper>
      </Box>
    </footer>
  );
}

export default Footer;