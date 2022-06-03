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

export const getTableData = (tableName) => {
  return new Promise(function(resolve, reject) {
    axios.get(`${CONFIG.baseDbURL}/configdb/tabledata/${tableName}`)
      .then(response => {
          if (response.data.error) {
            reject(response.data.error);
          } else {
            resolve(response.data);
          }
        }).catch(err => {
        console.error(err);
        reject(err);
      });
  });
}

export const getTables = () => {
  return new Promise(function(resolve, reject) {
    axios.get(`${CONFIG.baseDbURL}/configdb/tables`)
      .then(response => {
          if (response.data.error) {
            reject(response.data.error);
          } else {
            resolve(response.data);
          }
        }).catch(err => {
        console.error(err);
        reject(err);
      });
  });
}

// `/updateelement/${currentSelection.tableName}/${id}/${column}/${value}`;
export const updateElement = (tableName, id, column, value) => {
  return new Promise(function(resolve, reject) {
    axios.get(`${CONFIG.baseDbURL}/configdb/updateelement/${tableName}/${id}/${column}/${value}`)
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
  });
}

// const url = URL_PREFIX + `/createtable/${tableName}/${columnName}`;
export const createNewTable = (tableName, columnName) => {
  return new Promise(function(resolve, reject) {
    axios.get(`${CONFIG.baseDbURL}/configdb/createtable/${tableName}/${columnName}`)
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
  });
}

// const url = URL_PREFIX + `/droptable/${tableName}`;
export const dropTable = (tableName, columnName) => {
  return new Promise(function(resolve, reject) {
    axios.get(`${CONFIG.baseDbURL}/configdb/droptable/${tableName}`)
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
  });
}

// const url = URL_PREFIX + `/rename/table/${oldTableName}/${newTableName}`;
export const renTable = (oldTableName, newTableName) => {
  return new Promise(function(resolve, reject) {
    axios.get(`${CONFIG.baseDbURL}/configdb/rename/table/${oldTableName}/${newTableName}`)
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
  });
}

// const url = URL_PREFIX + `/createcolumn/${tableName}/${columnName}`;
export const createCol = (tableName, columnName) => {
  return new Promise(function(resolve, reject) {
    axios.get(`${CONFIG.baseDbURL}/configdb/createcolumn/${tableName}/${columnName}`)
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
  });
}

// const url = URL_PREFIX + `/rename/${tableName}/column/${oldColumnName}/${newColumnName}`;
export const renameCol = (tableName, oldColumnName, newColumnName) => {
  return new Promise(function(resolve, reject) {
    axios.get(`${CONFIG.baseDbURL}/configdb/rename/${tableName}/column/${oldColumnName}/${newColumnName}`)
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
  });
}

// const url = URL_PREFIX + `/insertrow/${currentSelection.tableName}`;
export const createNewRow = (tableName) => {
  return new Promise(function(resolve, reject) {
    axios.get(`${CONFIG.baseDbURL}/configdb/insertrow/${tableName}`)
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
  });
}

//const url = URL_PREFIX + `/dropcolumn/${currentSelection.tableName}/${columnName}`;
export const dropCol = (tableName, columnName) => {
  return new Promise(function(resolve, reject) {
    axios.get(`${CONFIG.baseDbURL}/configdb/dropcolumn/${tableName}/${columnName}`)
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
  });
}

