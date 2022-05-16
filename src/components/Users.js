import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  Box,
  Paper,
  Typography,
  OutlinedInput,
  Input,
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
  InputLabel
} from "@mui/material";
import { styled } from '@mui/material/styles';

import { useAuthContext } from './AuthContext';
import { getUsers, getUser, getRoles } from '../api';


const Item = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  bg: '#1A2027',
  padding: theme.spacing(1),
  textAlign: 'left',
  // color: theme.palette.text.secondary,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '90%',
  justify: 'center',
  textAlign: 'center'
}));

const MenuProps = {
  // PaperProps: {
  //   style: {
  //     maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //     width: 250
  //   }
  // },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};

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
  // const [selectedRoles, setSelectedRoles] = useState([]);

  const { auth } = useAuthContext();

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
    setRoles("");
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
          <Item><h3>Edit User</h3></Item>
          <Item>
          <FormControl variant="filled" sx={{ width: "100%" }}>
              <InputLabel id="select-label">User</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={userId}
                onChange={handleSelectUser}
              >
                {users}
              </Select>
            </FormControl>
          </Item>
          <Item>
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="loginInput">Login</InputLabel>
              <TextField id="loginInput" variant="filled" value={login} label="Login"></TextField>
            </FormControl>
          </Item>
          <Item>
            <FormControl variant="filled"fullWidth>
              <InputLabel htmlFor="nicknameInput">Nickname</InputLabel>
              <TextField id="nicknameInput" variant="filled" value={nickname} label="Nickname"></TextField>
            </FormControl>
          </Item>
          <Item>
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="emailInput">Email</InputLabel>
              <TextField id="emailInput" variant="filled" value={email} label="Email"></TextField>
            </FormControl>
          </Item>
          <Item>
            <FormControl variant="filled" sx={{ width: "100%" }}>
              <InputLabel id="mutiple-select-label">Roles</InputLabel>
              <Select
                labelId="mutiple-select-label"
                multiple
                value={roles}
                // onChange={handleChange}
                renderValue={(selected) => "[" + selected.join(", ") + "]"}
                MenuProps={MenuProps}
              >
                {rolesList.map((option) => (
                  <MenuItem key={option} value={option}>
                    <ListItemIcon>
                      {/* Is this option in the users roles? */}
                      <Checkbox checked={roles.indexOf(option) > -1} />
                    </ListItemIcon>
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Item>
          <Item>
            <FormGroup>
              <FormControlLabel control={<Checkbox id="active" checked={active} onClick={handleActive} />} label="Active" />
            </FormGroup>
          </Item>
          <Item>
            <FormGroup>
              <FormControlLabel control={<Checkbox id="resetpassword" checked={resetpwd} onClick={handleResetpwd} />} label="Reset Password" />
            </FormGroup>
          </Item>
        </Stack>
      </StyledPaper>
    </Box>
  );
}

export default Users;