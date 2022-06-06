import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Grid, Paper, Typography, TextField, Button, Link as Muilink } from "@mui/material";
import { loginApi } from '../api';

import {useAuthContext} from './AuthContext';

const StyledGrid = styled(Grid, {
  name: "StyledGrid",
  slot: "Wrapper"
})({
  justifyContent: "center",
  minHeight: "90vh",
});

const StyledPaper = styled(Paper, {
  name: "StyledPaper",
  slot: "Wrapper"
})({
  justifyContent: "center",
  minHeight: "30vh",
  padding: "50px",
});

const ErrMsgTypography = styled(Typography, {
  name: "ErrMsgTypoghraphy",
  slot: "Wrapper"
})({
  color: "red",
  fontSize: "20",
  fontWeight: "600",
});

const OffscreenTypography = styled(Typography, {
  name: "OffscreenTypography",
  slot: "Wrapper"
})({
    display: "none"
});

function Login( { showLogin } ) {
  const { auth, setAuth } = useAuthContext();

  const userRef = useRef();
  const errRef = useRef();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(showLogin);

  let navigate = useNavigate();

  useEffect(() => {
    setErrMsg('');
  }, [login, password]);

  const changeLogin = (event) => {
    setLogin(event.target.value);
    setErrMsg("");
  }

  const changePassword = (event) => {
    setPassword(event.target.value);
    setErrMsg("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginApi(login, password)
      .then(response => {
        // Set Context
        setAuth(JSON.stringify(response));
        setLogin('');
        setPassword('');
        setShow(false);
        if (response.resetpwd) {
          navigate("/resetpassword"); 
        } else {
          navigate("/home");
        }
      }).catch(err => {
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login Failed');
        }
      });
  }

  const out = show ?
  (
    <Grid container spacing={0} justifyContent="center" direction="row">
      <Grid item >
        <StyledGrid container direction="column" justifyContent="center" spacing={2} >
          <StyledPaper variant="elevation" elevation={2} sx={{ bgcolor: "background.lightestBlue" }}>
            <Grid item>
              {errMsg === "" ? <OffscreenTypography ref={errRef} aria-live="assertive" /> : <ErrMsgTypography ref={errRef} aria-live="assertive" >{errMsg}</ErrMsgTypography>}
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h5">Sign in</Typography>
            </Grid>
            <Grid item>
              <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      ref={userRef}
                      type="login"
                      placeholder="Login"
                      variant="outlined"
                      value={login}
                      onChange={changeLogin}
                      required
                      autoFocus={true} />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="password"
                      placeholder="Password"
                      variant="outlined"
                      value={password}
                      onChange={changePassword}
                      required />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{ width: "100%", bgcolor: "background.darkestBlue" }} >Submit</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item>
              <Muilink href="#" variant="body2" sx={{ color: "background.darkestBlue" }}>Forgot Password?</Muilink>
            </Grid>
          </StyledPaper >
        </StyledGrid >
      </Grid >
    </Grid > ) :
    null;

  return out
    
}
export default Login;