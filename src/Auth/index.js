import {toast} from 'react-toastify';

export const saveUser = (data) => {
    if(!data) return;
    localStorage.setItem('user', JSON.stringify(data));
};

export const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token ? user.token : null;
};

export const RedirectToLogin = () => {
    return  window.location.href = 'app/Auth/signIn';
};

export const logout = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
        return toast.error('You are not logged in')
    }
    localStorage.removeItem('user');
    window.location.href = '/app';
    return toast.success('successfully logged out')
}