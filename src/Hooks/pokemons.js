import axios from './configs';
import {isAuthenticated, RedirectToLogin} from '@Auth';


export const catchPokemon = async(pokemon) => {
    const token = isAuthenticated();
    if(!token) return RedirectToLogin();

    const data = await axios.post('/pokemon/AddFavorite', {
        ...pokemon
    }, {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
    .then(res => res)
    .catch(err => err);
    
    if(data?.response?.status === 401) return RedirectToLogin()
    
    return data;
};

export const getFavorites = async(id) => {
    const token = isAuthenticated();
    if(!token) return RedirectToLogin();

    const data = await axios.get(`/pokemon/GetFavorites/${id}` , {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
    .then(res => res)
    .catch(err => err);

    if(data?.response?.status === 401) return RedirectToLogin()

    return data;
};

export const deleteFavorite = async (data) => {
    const token = isAuthenticated();
    if(!token) return RedirectToLogin();

    const pokeData =  await axios.delete('/pokemon/DeleteFavorite', {headers: {'Authorization': `Bearer ${token}`}, data})
    .then(res => res)
    .catch(err => err);

    if(data?.response?.status === 401) return RedirectToLogin();

    return pokeData;
};