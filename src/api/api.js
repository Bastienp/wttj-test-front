import axios from 'axios';

const baseUrl = 'http://localhost:3000/'
export const getUsers = () => {
    return axios.get(baseUrl + 'users')
};

export const getLists = () => {
    return axios.get(baseUrl + 'lists')
};

export const updateUser = (id, list_id, list_users) => {
    return axios.put(baseUrl + 'users/' + id, {
        user: {
            list_id: list_id,
            list_users: list_users
        }
    })
};

export const updateUsersPositions = (users) => {
    axios.put(baseUrl + 'users_positions', {
        users
    });
};