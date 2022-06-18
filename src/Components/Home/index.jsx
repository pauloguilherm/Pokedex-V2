import Pokemons from '../Pokemons';
import {useState, useEffect, useCallback} from 'react';
import {useContext} from 'react';
import {AppContext} from '../Container';
import {Button} from 'reactstrap';
import {BiArrowToBottom} from 'react-icons/bi';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
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
          <Pokemons data={data} loadData={loadData}/>
          {!search && 
          <div className="d-flex justify-content-center">
            <Button title="load more" color="link buttonMore" onClick={()=> setLimitPokemons(limit => limit + 10)}>
            {loading ? <AiOutlineLoading3Quarters size="50"/> : <BiArrowToBottom size="50" />}
          </Button>
          </div>}
        </>
    )
}

export default Home;