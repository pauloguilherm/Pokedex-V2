import {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardBody, CardImg, CardTitle, Button} from 'reactstrap';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {getAllPokes} from '../../Hooks/api';
import {AppContext} from '../Container';
import {useContext} from 'react';
import Modal from '../Modal';
import {toast} from 'react-toastify';
export default function Pokemons({data, loadData}){
    const {search, setSearch} = useContext(AppContext);
    const [pokemons, setPokemons] = useState([]);
    const [openModal, setOpenModal] = useState();

    const getSearchPokemon = async() => {
        const data = await getAllPokes(search)
        .then(res => res)
        .catch(err => err.response.status);
        if(data === 404){
            toast.error('Pokemon not found');
            setSearch(false);
            return
        };
        const newObj = 
        {
            id: data.data.id,
            name: data.data.name,
            img: data.data.sprites.other.dream_world.front_default,
            statistcs: getStatistcs(data.data.stats),
            types: getType(data.data),
        };

        setPokemons([newObj]);
    };

    const getAll = useCallback(() =>{
        const pokeObj = []
        data?.map(async(poke, key) => {
           const data = await getAllPokes(poke.name)
           pokeObj[key] = 
           {
              id: data.data.id,
              name: data.data.name,
              img: data.data.sprites.other.dream_world.front_default,
              statistcs: getStatistcs(data.data.stats),
              types: getType(data.data),
            }
        }); 
        setTimeout(()=> {
            setPokemons(pokeObj);
        },200)
    },[data]);

    const getStatistcs = (stats) => {
        const pokeStatistic = stats.map((stat)=> (
            {name: stat.stat.name, status: stat.base_stat }
        ));
        return pokeStatistic;
    };

    const getType = (data) => {
        let type = data?.types?.map((pokeType)=> (
            pokeType.type.name
        ))
        return type;
    };

    const getTypeColor = (types) => {
        switch(types[0]) {
            case 'normal':
                return '#0174C5';
            case 'fighting':
                return '#FFD1D1';
            case 'flying':
                return '#B5E1F7';
            case 'poison':
                return '#EEDD82';
            case 'ground':
                return '#D3D3D3';
            case 'rock':
                return '#A9A9A9';
            case 'bug':
                return '#DEFFDE';
            case 'ghost':
                return '#D1E4FF';
            case 'steel':
                return '#D3D3D3';
            case 'fire':
                return '#FFD1D1';
            case 'water':
                return '#6a9fc5';
            case 'grass':
                return '#DEFFDE';
            case 'electric':
                return '#EEDD82';
            case 'psychic':
                return '#D1E4FF';
            case 'ice':
                return '#6a9fc5';
            case 'dragon':
                return '#D1E4FF';
            case 'dark':
                return '#3a3a3a';
            case 'fairy':
                return '#EEDD82';
            default:
                return '#D3D3D3';
        }
    };

    useEffect(getAll, [getAll]);
    useEffect(()=> {
        getSearchPokemon()
    }, [search]);

    return(
        <div className='container-pokemon' style={search ? {gridTemplateColumns: '1fr'} : {gridTemplateColumns: '1fr 1fr 1fr'}}>
            {pokemons?.map((item) => (
                <>
                {search && <Button className="d-flex justify-content-start " color="link" onClick={()=> {loadData(); setSearch(false)}}><AiOutlineArrowLeft size="50"/></Button>}
                <Card key={item.id}>
                    {item.id === openModal && <Modal isOpen={item.id === openModal} setIsOpen={setOpenModal} data={item} />}
                    <CardHeader style={{ backgroundColor: getTypeColor(item.types) }}>
                        <CardImg src={item?.img} alt={item.name} />
                    </CardHeader>
                    <CardBody className={search ? 'card-search' : ''}>
                        <CardTitle>{item?.name} - 00{item?.id}</CardTitle>
                        <Button color="primary" onClick={() => setOpenModal(item.id)}>Infos</Button>
                    </CardBody>
                </Card>
                </>
            ))}
        </div>
    )
};

Pokemons.propTypes = {
    data: PropTypes.array.isRequired,
};