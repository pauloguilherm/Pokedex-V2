import {useState, useEffect, useCallback, useContext} from 'react';
import {Card, CardHeader, CardBody, CardImg, CardTitle, Button, Badge} from 'reactstrap';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';


import {AppContext} from '@Components/Container';
import {Modal} from '@Components';
import {getAllPokes} from '@Hooks/api';
import {catchPokemon, getFavorites} from '@Hooks/pokemons';
import {getStatistcs, getType, getTypeColor} from '@Utils/customizes';

import ClosedPokeBall from '@Assets/pokeBolaFechada.png';
import OpenPokeBall from '@Assets/pokeBolaAberta.png';

export default function Pokemons({data, loadData}){
    const {search, setSearch, userData, token} = useContext(AppContext);
    const [pokemons, setPokemons] = useState([]);
    const [openModal, setOpenModal] = useState();
    const [catchs, setCatchs] = useState([]);

    useEffect(()=> {
        if(search?.search) setPokemons([search]);
    }, [search])

    useEffect(()=> {
        if(!userData.id) return;

        (async () => {
            const {data} = await getFavorites(userData.id, token);
            setCatchs(data.map(pokemon => pokemon.name));
        })();
    }, [token]);

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

    const savePokemon = useCallback(async(name)=> {
        const saveObj = {
            id: userData.id,
            name: name,
        };

        const {data} = await catchPokemon(saveObj, token);
        if(!data.success){
            return toast.error(data.message);
        };
        return toast.success(data.message);
        
    }, []);

    const deletePokemon = useCallback(async (name)=> {

    }, []);

    const handlePokemon = useCallback(async(name) => {
        if(catchs.includes(name)){

        };
        await savePokemon(name);
    }, []);

    useEffect(getAll, [getAll]);

    return(
        <div className={search?.search ? 'container-pokemon-only container-pokemon' : 'container-pokemon'}>
            {pokemons?.map((pokemon) => (
                <div key={pokemon.name}>
                {search?.search && <Button style={{marginLeft: '20px'}} className="d-flex justify-content-start " color="link" onClick={()=> {loadData(); setSearch(false);}}><AiOutlineArrowLeft size="50"/></Button>}
                <Card>
                    {pokemon?.id === openModal && <Modal isOpen={pokemon?.id === openModal} setIsOpen={setOpenModal} data={pokemon} />}

                    <CardHeader style={{ backgroundColor: getTypeColor(pokemon?.types) }}>
                        <CardImg src={pokemon?.img} alt={pokemon?.name} />
                    </CardHeader>

                    <CardBody className={!search?.search ? 'card-search d-flex flex-row justify-content-between' : ''}>
                        <div className="d-flex justify-content-center">
                            <CardTitle><img src={catchs.includes(pokemon.name) ?  ClosedPokeBall : OpenPokeBall} onClick={()=> handlePokemon(pokemon.name)}/> - {pokemon?.name}</CardTitle>
                            {pokemon.types.map((type) => <Badge key={type} color="link" style={{color: 'white', backgroundColor: getTypeColor(pokemon?.types)}}>{type}</Badge>)}
                        </div>
                        <Button color="primary" onClick={() => setOpenModal(pokemon?.id)}>Infos</Button>
                    </CardBody>
                </Card>
                </div>
            ))}
        </div>
    )
};

Pokemons.propTypes = {
    data: PropTypes.array.isRequired,
    loadData: PropTypes.func,
};