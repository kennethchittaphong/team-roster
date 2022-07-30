import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL TEAMS
const getTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// CREATE TEAM
const createTeam = (teamObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/teams.json`, teamObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/teams/${response.data.name}.json`, payload)
        .then(() => {
          getTeams().then(resolve);
        });
    })
    .catch(reject);
});

// GET SINGLE TEAM
const getSingleTeam = (teamId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams/${teamId}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// DELETE TEAM
// eslint-disable-next-line no-unused-vars
const deleteSingleTeam = (firebaseKey, teamId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/teams/${firebaseKey}.json`)
    .then(() => {
      getTeams().then((teamsArr) => resolve(teamsArr));
    })
    .catch((error) => reject(error));
});

// UPDATE TEAM
const updateTeam = (teamObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/teams/${teamObj.firebaseKey}.json`, teamObj)
    .then(() => getTeams().then(resolve))
    .catch(reject);
});

const getPlayersTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="team_id"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getTeams,
  getPlayersTeam,
  getSingleTeam,
  deleteSingleTeam,
  updateTeam,
  createTeam,
};
