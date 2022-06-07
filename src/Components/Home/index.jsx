import Pokemons from '../Pokemons';
import {useState, useEffect} from 'react';
import {getData} from '../../Service/api';

const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async() => {
        await getData().then(res => {
            setData(res.data.results);
        });
    };

    useEffect(()=>loadData, []);
    
    return(
        <>
          <Pokemons data={data}/>
        </>
    )
}

export default Home;