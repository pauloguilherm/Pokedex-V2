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
    const url = window.location.href.substring(window.location.href.indexOf('/app'), window.location.href.length)
    window.location.href = url.substring(0, 4) + '/Auth/signIn';
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