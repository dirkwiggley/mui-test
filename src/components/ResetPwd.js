import { useEffect, useState, useRef } from 'react';
import { useAuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Grid, Paper, Typography, TextField, Button, Link as Muilink } from "@mui/material";
import { resetPassword } from '../api';

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
  minHeight: "25vh",
  minWidth: "45vw",
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

function ResetPwd() {
  const errRef = useRef();
  
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { auth } = useAuthContext();

  let navigate = useNavigate();

  useEffect(() => {
    if (auth && auth !== "") {
      try {
        let authObj = JSON.parse(auth);
        let isAdmin = roles ? roles.includes("ADMIN") : null;
        setIsAdmin(isAdmin);
        setUserId(authObj.id);
      } catch (err) {
        console.error(err);
        setRoles([]);
        setIsAdmin(false);
      }
    }
  }, [auth]);

  const changePassword = (event) => {
    const newPwd = event.target.value;
    setPassword(newPwd);
    if (newPwd !== confirmPassword) {
      setErrMsg("Password must match Confirmation Password");
    } else {
      setErrMsg("");
    }
  }

  const changeConfirmPassword = (event) => {
    const newConfPwd = event.target.value;
    setConfirmPassword(newConfPwd);
    if (password !== newConfPwd) {
      setErrMsg("Password must match Confirmation Password");
    } else {
      setErrMsg("");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    resetPassword(userId, password).then(response => {
      alert("Success");
    }).catch(err => {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    });

    navigate('/login');
  }

  return (
    <Grid container spacing={0} justifyContent="center" direction="row">
      <Grid item >
        <StyledGrid container direction="column" justifyContent="center" spacing={2} >
          <StyledPaper variant="elevation" elevation={2} >
            <Grid item>
              {errMsg ? <ErrMsgTypography ref={errRef} aria-live="assertive" >{errMsg}</ErrMsgTypography> : <OffscreenTypography ref={errRef} aria-live="assertive" />}
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h5">Reset Password</Typography>
            </Grid>
            <Grid item>
              <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      id="password"
                      type="password"
                      placeholder="Password"
                      variant="outlined"
                      value={password}
                      onChange={changePassword}
                      required 
                      sx={{ width: "100%" }} />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      variant="outlined"
                      value={confirmPassword}
                      onChange={changeConfirmPassword}
                      required 
                      sx={{ width: "100%" }} />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={errMsg !== ""}
                      sx={{ width: "100%" }} >Submit</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </StyledPaper >
        </StyledGrid >
      </Grid >
    </Grid >
  );
}

export default ResetPwd;