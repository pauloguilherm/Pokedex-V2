import axios from 'axios';

export const registerUser = async(user) => {
    return await axios.post('https://localhost:44342/api/user/signUp', user)
    .then(res => res)
    .catch(err => err);
};

export const login = async (user) => {
    return await axios.post('https://localhost:44342/api/user/signIn', user)
    .then(res => res)
    .catch(err => err);
};