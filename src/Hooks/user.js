import axios from './configs';

export const registerUser = async(user) => {
    return await axios.post('/api/user/signUp', user)
    .then(res => res)
    .catch(err => err);
};

export const login = async (user) => {
    return await axios.post('/user/signIn', user)
    .then(res => res)
    .catch(err => err);
};