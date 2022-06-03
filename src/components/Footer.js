import { useEffect, useState } from 'react';
import { Box, Paper } from "@mui/material";
import { useAuthContext } from './AuthContext';

import { DARKEST_BLUE } from '../colors';

const boxStyle = {
  width: '100%',
  bottom: 0,
  position: "absolute",
  borderRadius: 0
};

const paperStyle = {
  backgroundColor: DARKEST_BLUE,
  borderRadius: 0
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
    } else if (auth === "") {
      setLogin("");
      setNickname("");
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