import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, TextField, Button, Link as Muilink } from "@mui/material";

import { useAuthContext } from './AuthContext';

const Profile = () => {
  const [login, setLogin] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const { auth } = useAuthContext();

  let navigate = useNavigate();

  useEffect(() => {
    if (!auth || auth === "") {
      navigate("/login");
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (auth && auth !== "") {
      try {
        let authObj = JSON.parse(auth);
        let roles = authObj ? authObj.roles : null;
        let isAdmin = roles ? roles.includes("ADMIN") : null;
        setLogin(authObj.login);
        setRoles(roles);
        setIsAdmin(isAdmin);
        setNickname(authObj?.nickname);
        setEmail(authObj?.email);
      } catch (err) {
        console.error(err);
        setRoles([]);
        setIsAdmin(false);
      }
    }
  }, [auth, setRoles, setIsAdmin]);

  const getRoles = () => {
    return roles ? JSON.stringify(roles, null, 2) : "none";
  } 

  const handleSubmit = () => {

  }

  return (
    <Grid container spacing={0} justifyContent="center" direction="row">
      <Grid item >
        <Grid container direction="column" justifyContent="center" spacing={2} sx={{
          justifyContent: "center", 
          minHeight: "90vh"
        }} >
          <Paper variant="elevation" elevation={2} sx={{
            justifyContent: "center", 
            minHeight: "20vh", 
            padding: "50px"
          }}>
            <Grid item>
              <Typography component="h1" variant="h5">Profile</Typography>
            </Grid>
            <Grid item>
              <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Typography sx={{ mt: 2 }}>Login: {login}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Nickname: {nickname}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Email: {email}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Roles: {getRoles()}</Typography>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Paper >
        </Grid >
      </Grid >
    </Grid >);
}

export default Profile;