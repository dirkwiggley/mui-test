import { useEffect, useState } from 'react';
import { Box, Paper, TextField } from "@mui/material";
import { useAuthContext } from './AuthContext';


const paperStyle = {
  bgcolor: "background.darkestBlue",
  color: "#FFFFFF",
  borderRadius: 0,
  width: "100vw",
  bottom: 0,
  position: "absolute",
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
      <Box sx={{ flexGrow: 1 }} >
        <Paper sx={{ ...paperStyle, bgcolor: "background.darkestBlue" }}>
          <Box sx={{ ml: 2 }}>
            {login ? out : "-"}
          </Box>
        </Paper>
      </Box>
    </footer>
  );
}

export default Footer;