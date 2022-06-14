import Pokemons from '../Pokemons';
import {useState, useEffect, useCallback} from 'react';
import {Button} from 'reactstrap';
import {getData} from '../../Service/api';
const Home = () => {
    const [data, setData] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [loading, setLoading] = useState(false);

     const loadData = useCallback(async() => {
        setLoading(true);
        await getData(offSet).then(res => {
            setData(res.data.results);
        });
        setLoading(false);
    },[offSet]);

    useEffect(()=>loadData, [loadData, offSet]);
    
    return(
        <>
          <Pokemons data={data}/>
          <Button color="primary" onClick={()=> setOffSet((set)=> set+10)}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </>
    )
}

export default Home;