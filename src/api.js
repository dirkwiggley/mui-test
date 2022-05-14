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