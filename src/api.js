// const axios = require('axios');
import axios from 'axios';
import CONFIG from './config';

export const loginApi = (login, pwd) => {
  return new Promise(function (resolve, reject) {
    const params = { login: login, password: pwd };
    axios.put(`${CONFIG.baseDbURL}/users/login/`, params)
      .then(response => {
        if (response.data.error) {
          reject(response.data.error);
        } else {
          const user = response.data.user;
          const roles = JSON.parse(user.roles);
          user.roles = roles;
          resolve(user);
        }
      }).catch(err => {
        console.error(err);
        reject(err);
      });
  })
}

export const getUsers = () => {
  return new Promise(function(resolve, reject) {
    axios.get(`${CONFIG.baseDbURL}/users/`)
      .then(response => {
        if (response.data.error) {
          reject(response.data.error);
        } else {
          resolve(response.data.users);
        }
      }).catch(err => {
        console.error(err);
        reject(err);
      });
  })
}

export const getUser = (userId) => {
  return new Promise(function(resolve, reject) {
    axios.get(`${CONFIG.baseDbURL}/users/id/${userId}`)
      .then(response => {
        if (response.data.error) {
          reject(response.data.error);
        } else {
          const user = response.data.user;
          const roles = JSON.parse(user.roles);
          user.roles = roles;
          resolve(response.data.user);
        }
      }).catch(err => {
        console.error(err);
        reject(err);
      });
  })
}

export const getRoles = () => {
  return new Promise(function(resolve, reject) {
    axios.get(`${CONFIG.baseDbURL}/roles/`)
      .then(response => {
        if (response.data.error) {
          reject(response.data.error);
        } else {
          resolve(response.data.roles);
        }
      }).catch(err => {
        console.error(err);
        reject(err);
      });
  })
}

export const updateUser = (userInfo) => {
  return new Promise(function(resolve, reject) {
    axios.post(`${CONFIG.baseDbURL}/users/update/`, userInfo)
      .then(response => {
        if (response.data.error) {
          reject(response.data.error);
        } else {
          resolve()
        }
      }).catch(err => {
        console.error(err);
        reject(err);
      })
  })
}

export const resetPassword = (userId, newPassword) => {
  return new Promise(function(resolve, reject) {
    const userInfo = { "id" : userId, "password" : newPassword };
    axios.post(`${CONFIG.baseDbURL}/users/resetpassword/`, userInfo)
      .then(response => {
        if (response.data.error) {
          reject(response.data.error);
        } else {
          resolve();
        }
      }).catch(err => {
        console.error(err);
        reject(err);
      });
  })
}

