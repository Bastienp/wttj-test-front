import axios from 'axios';


export const getUsers = () => {
    return axios.get('http://localhost:3001/users')
};

export const getLists = () => {
    return axios.get('http://localhost:3001/lists')
};

export const updateUser = (id, list_id, list_users) => {
    return axios.put('http://localhost:3001/users/' + id, {
        user: {
            list_id: list_id,
            list_users: list_users
        }
    })
};

export const updateUsersPositions = (users) => {
    axios.put('http://localhost:3001/users_positions', {
        users
    });
};