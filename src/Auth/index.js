export const saveUser = (data) => {
    if(!data) return;
    localStorage.setItem('user', JSON.stringify(data));
};

export const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token ? user.token : null;
};

export const RedirectToLogin = () => {
    return  window.location.href = '/Auth/signIn';
};