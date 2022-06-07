import axios from 'axios';

export const getData = async() => (
   await axios.get('https://pokeapi.co/api/v2/pokemon/')
);

export const getAllPokes = async(name) => (
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
);
