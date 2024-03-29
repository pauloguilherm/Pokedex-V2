import axios from 'axios';

export const getData = async(limit) => (
   await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`)
);

export const getAllPokes = async(name) => (
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
);

export const getEvolutions = async(id) => {
    const specie = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const evolution = await axios.get(specie.data.evolution_chain.url);
    return evolution;
};
