const axios = require('axios');

export const loginApi = (login, pwd) => {
  return new Promise(function (resolve, reject) {
    const params = { login: login, password: pwd };
    axios.put('http://10.0.0.221:3001/users/login/', params)
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
    axios.get("http://10.0.0.221:3001/users/")
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
    axios.get("http://10.0.0.221:3001/users/id/"+userId)
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
    axios.get("http://10.0.0.221:3001/roles/")
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
    axios.post("http://10.0.0.221:3001/users/update/", userInfo)
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
