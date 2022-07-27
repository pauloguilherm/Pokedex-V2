import {useState, useEffect, useCallback, useContext} from 'react';
import {Button} from 'reactstrap';
import Loading from '@Components/Loading';
import {RiArrowDownFill} from 'react-icons/ri';


import {getData} from '@Hooks/api';
import Pokemons from '../Pokemons';
import {AppContext} from '../Container';

const Home = () => {
    const [data, setData] = useState([]);
    const {search, limitPokemons, setLimitPokemons} = useContext(AppContext);
    const [loading, setLoading] = useState(false);

     const loadData = useCallback(async() => {
        setLoading(true);
        await getData(limitPokemons).then(res => setData(res.data.results));
        setLoading(false);
      },[limitPokemons]);

    useEffect(()=> {
      loadData();
    }, [loadData, limitPokemons]);
    
    return(
        <>
          <Pokemons data={data} loadData={loadData}/>
          {!search && 
          <div className="d-flex justify-content-center">
            <Button title="load more" color="link buttonMore" onClick={()=> setLimitPokemons(limit => limit + 10)}>
            {loading ? <Loading /> : <RiArrowDownFill size="50" />}
          </Button>
          </div>}
        </>
    )
}

export default Home;