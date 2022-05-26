import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  Box,
  Paper,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Button,
  Select,
  MenuItem,
  Stack,
  InputLabel,
  Grid,
  Item,
  Typography
} from "@mui/material";
import { styled } from '@mui/material/styles';

import { useAuthContext } from './AuthContext';
import { getUsers, getUser, getRoles, updateUser } from '../api';

const PAPER_COLOR = "#99d6ff";
const LIGHT_PAPER_COLOR = "#a8e6f0";

const StackItem = styled(Box)(({ theme }) => ({
  // backgroundColor: PAPER_COLOR,
  selected: PAPER_COLOR,
  padding: theme.spacing(1),
  textAlign: 'left',
  or: theme.palette.text.secondary,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: PAPER_COLOR,
  width: '90%',
  justify: 'center',
  textAlign: 'center'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "#99d6ff",
  justify: 'center',
  textAlign: 'center'
}));

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [login, setLogin] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const [active, setActive] = useState(false);
  const [resetpwd, setResetpwd] = useState(false);
  const [rolesList, setRolesList] = useState([]);

  const { auth, setAuth } = useAuthContext();

  let navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth ? JSON.parse(auth) : null;
    const admin = currentUser ? currentUser.roles.includes('ADMIN') : false;
    if (!admin) {
      navigate("/home");
    } else {
      if (currentUser) {
        setUserId(currentUser.id);
        setLogin(currentUser.login);
        setNickname(currentUser.nickname);
        setEmail(currentUser.email);
        setRoles(currentUser.roles);
        setActive(currentUser.active === 1);
        setResetpwd(currentUser.resetpwd === 1);
      }
    }

    getRoles().then(response => {
      const newRoles = [];
      response.forEach(element => {
        newRoles.push(element.name);
      });
      setRolesList(newRoles);
    }).catch(err => {
      console.error(err);
    });

    getUsers().then(response => {
      const newUsers = [];
      response.forEach(element => {
        newUsers.push(<MenuItem key={element.id} value={element.id}>{element.login}({element.nickname})</MenuItem>);
      });
      if (admin) {
        newUsers.push(<MenuItem key="add" value="add">Add a user</MenuItem>);
      }
      setUsers(newUsers);
    }).catch(err => {
      console.error(err);
    });
  }, [auth]);

  useEffect(() => {
    if (!auth || auth === "") {
      navigate("/login");
    }
  }, [auth, navigate]);

  const resetUser = (id = "") => {
    setUserId(id);
    setLogin("");
    setNickname("");
    setEmail("");
    setRoles([]);
    setActive(false);
    setResetpwd(false);
  }

  const handleSelectUser = (event) => {
    const selectedId = event.target.value;
    setUserId(selectedId);
    if (selectedId === "add") {
      resetUser("add");
    } else {
      getUser(selectedId)
        .then(response => {
          setLogin(response.login);
          setNickname(response.nickname);
          setEmail(response.email);
          setRoles(response.roles);
          setActive(response.active === 1);
          setResetpwd(response.resetpwd === 1);
        }).catch(err => {
          alert("Error handling incomplete");
          resetUser();
        });
    }
  }

  const handleActive = () => {
    setActive(!active);
  }

  const handleResetpwd = () => {
    setResetpwd(!resetpwd);
  }

  const handleChangeRoles = (role) => {
    let filtered = null;
    if (roles.includes(role)) {
      filtered = roles.filter(function (value, index, arr) {
        return value !== role;
      });
      setRoles(filtered);
    } else {
      filtered = [...roles];
      filtered.push(role);
      setRoles(filtered);
    }
  }

  const handleUpdate = () => {
    let userInfo = {};
    userInfo.id = userId;
    userInfo.login = login;
    userInfo.nickname = nickname;
    userInfo.email = email;
    userInfo.roles = JSON.stringify(roles);
    userInfo.active = active ? 1 : 0;
    userInfo.resetpwd = resetpwd ? 1 : 0;
    updateUser(userInfo)
      .then(result => {
        alert("Success");
        const authObj = JSON.parse(auth);
        if (userInfo.id === authObj.id) {
          setAuth(JSON.stringify(userInfo));
        }
      }).catch(err => {
        alert(err);
      });
  }

  const handleInputChange = (elementName) => {
    let element = document.getElementById(elementName);
    let value = element.value;
    if (elementName === "loginInput") {
      setLogin(value);
    } else if (elementName === "nicknameInput") {
      setNickname(value);
    } else if (elementName === "emailInput") {
      setEmail(value);
    } else {
      alert("Invalid document element");
    }
  }

  const getLoginInput = () => {
    if (userId === "add") {
      return (
        <TextField
          id="loginInput"
          label="Login"
          InputLabelProps={{ shrink: true }}
          autoComplete="off"
          value={login}
          onChange={() => handleInputChange("loginInput")} />
      );
    } else {
      return (
        <TextField id="loginInput" variant="filled" value={login} label="Login"></TextField>
      );
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="Center"
      sx={{
        width: '90%',
        mt: 2
      }}>
      <StyledPaper square={false} >
        <Stack spacing={1}>
          <StackItem><h3>Edit User</h3></StackItem>
          <StackItem>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="select-label">User</InputLabel>
              <Select
                labelId="select-label"
                id="select-user"
                value={users?.length > 0 ? userId : ""}
                onChange={handleSelectUser}
              >
                {users}
              </Select>
            </FormControl>
          </StackItem>
          <StackItem>
            <FormControl variant="filled" fullWidth>
              {getLoginInput()}
            </FormControl>
          </StackItem>
          <StackItem>
            <FormControl variant="filled" fullWidth>
              <TextField
                id="nicknameInput"
                label="Nickname"
                InputLabelProps={{ shrink: true }}
                autoComplete="off"
                value={nickname}
                onChange={() => handleInputChange("nicknameInput")} />
            </FormControl>
          </StackItem>
          <StackItem>
            <FormControl variant="filled" fullWidth>
              <TextField
                id="emailInput"
                label="Email"
                InputLabelProps={{ shrink: true }}
                autoComplete="off"
                value={email}
                onChange={() => handleInputChange("emailInput")} />
            </FormControl>
          </StackItem>
          <StackItem>
            <StyledPaper sx={{ backgroundColor: LIGHT_PAPER_COLOR, width: "100%" }}>
              <Typography sx={{ display: "flex", ml: 2, pt: 2 }} >
                Roles
              </Typography>
              <FormControl sx={{ width: "100%", ml: 2 }}>
                {rolesList.map((option) => (
                  <FormGroup key={option}>
                    {/* Is this option in the users roles? */}
                    <FormControlLabel control={<Checkbox checked={roles?.includes(option)} />} label={option} onChange={() => handleChangeRoles(option)} />
                  </FormGroup>
                ))}
              </FormControl>
            </StyledPaper>
          </StackItem>
          <StackItem>
            <StyledPaper sx={{ backgroundColor: "#a8e6f0", width: "100%" }}>
              <Stack>
                <StackItem>
                  <Typography sx={{ p: 0, ml: 1 }}>
                    Misc
                  </Typography>
                </StackItem>
                <StackItem>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox id="active" checked={active} onClick={handleActive} sx={{ p: 0, ml: 2 }} />} label="Active" />
                  </FormGroup>
                </StackItem>
                <StackItem>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox id="resetpassword" checked={resetpwd} onClick={handleResetpwd} sx={{ p: 0, ml: 2 }} />} label="Reset Password" />
                  </FormGroup>
                </StackItem>
              </Stack>
            </StyledPaper>
          </StackItem>
          <StackItem>
            <Button variant="contained" onClick={handleUpdate}>Update</Button>
          </StackItem>
        </Stack>
      </StyledPaper>
    </Box>
  );
}

export default Users;