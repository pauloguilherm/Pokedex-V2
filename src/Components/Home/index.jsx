import Pokemons from '../Pokemons';
import {useState, useEffect, useCallback} from 'react';
import {useContext} from 'react';
import {AppContext} from '../Container';
import {Button} from 'reactstrap';
import {getData} from '../../Hooks/api';
const Home = () => {
    const [data, setData] = useState([]);
    const {search, limitPokemons, setLimitPokemons} = useContext(AppContext);
    const [loading, setLoading] = useState(false);

     const loadData = useCallback(async() => {
        setLoading(true);
        await getData(limitPokemons).then(res => {
            setData(res.data.results);
        });
        setLoading(false);
      },[limitPokemons]);

    useEffect(()=> {
      loadData();
    }, [loadData, limitPokemons]);
    
    return(
        <>
          <Pokemons data={data}/>
          {!search && <Button color="primary" onClick={()=> setLimitPokemons((limit)=> limit+10)}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>}
        </>
    )
}

export default Home;