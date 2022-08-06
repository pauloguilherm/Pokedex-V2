import axios from './configs';
import {isAuthenticated, RedirectToLogin} from '@Auth';


export const catchPokemon = async(pokemon) => {
    const token = isAuthenticated();
    if(!token) return RedirectToLogin();

    return await axios.post('/pokemon/AddFavorite', {
        ...pokemon
    }, {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
    .then(res => res)
    .catch(err => err);
};

export const getFavorites = async(id) => {
    const token = isAuthenticated();
    if(!token) return RedirectToLogin();

    return await axios.get(`/pokemon/GetFavorites/${id}` , {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
    .then(res => res)
    .catch(err => err)
};

export const deleteFavorite = async (pokemon) => {
    const token = isAuthenticated();
    if(!token) return RedirectToLogin();

    const headers = {'Authorization': `Bearer ${token}`};
    const data = {...pokemon};
    return await axios.delete('/pokemon/DeleteFavorite', {headers, data})
    .then(res => res)
    .catch(err => err)
};