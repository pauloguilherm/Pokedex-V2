import axios from './configs';


export const catchPokemon = async(pokemon, token) => {
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

export const getFavorites = async(id, token) => {
    return await axios.get(`/pokemon/GetFavorites/${id}` , {
        
    }, {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
    .then(res => res)
    .catch(err => err)
};

export const deleteFavorite = async (id) => {
    return await axios.delete(`/pokemon/DeleteFavorite/${id}`)
    .then(res => res)
    .catch(err => err)
};