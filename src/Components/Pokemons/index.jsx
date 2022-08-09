import {useState, useEffect, useCallback, useContext} from 'react';
import {Card, CardHeader, CardBody, CardImg, CardTitle, Button, Badge} from 'reactstrap';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';


import {AppContext} from '@Components/Container';
import {Modal} from '@Components';
import {getAllPokes} from '@Hooks/api';
import {catchPokemon, getFavorites, deleteFavorite} from '@Hooks/pokemons';
import {getStatistcs, getType, getTypeColor} from '@Utils/customizes';

import ClosedPokeBall from '@Assets/pokeBolaFechada.png';
import OpenPokeBall from '@Assets/pokeBolaAberta.png';

export default function Pokemons({data, loadData}){
    const {search, setSearch, userData} = useContext(AppContext);
    const [pokemons, setPokemons] = useState([]);
    const [openModal, setOpenModal] = useState();
    const [catchs, setCatchs] = useState([]);

    const getAll = useCallback(() =>{
        const pokeObj = []
        data?.forEach(async(poke, key) => {
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

    useEffect(()=> {
        if(search?.search) setPokemons([search]);
    }, [search])

    useEffect(()=> {
        if(!userData.id) return;

        (async () => {
            const {data: {data}} = await getFavorites(userData.id);
            setCatchs(data.map(pokemon => pokemon.name));
        })();
    }, [userData.id]);

    const savePokemon = useCallback(async(name)=> {
        const saveObj = {
            name: name,
            coach: userData.name,
            coachId: userData.id,
        };

        const {data} = await catchPokemon(saveObj);
        if(!data.success){
            return toast.error(data.message);
        };
        setCatchs(prev => [...prev, name]);
        return toast.success(data.message);
        
    }, [userData]);

    const deletePokemon = useCallback(async (name)=> {
        const saveObj = {
            name: name,
            coach: userData.name,
            coachId: userData.id,
        };
        const {data} = await deleteFavorite(saveObj);
        if(!data.success){
            return toast.error(data.message);
        };
        
        setCatchs(prev => prev.filter(pokemon => pokemon !== name));
        return toast.success(data.message);
    }, [userData]);

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
                        <div className="d-flex justify-content-center cursor-pointer">
                            <CardTitle>
                                <img 
                                    src={catchs.includes(pokemon.name) ?  ClosedPokeBall : OpenPokeBall} 
                                    onClick={()=> catchs.includes(pokemon.name) ? deletePokemon(pokemon.name) : savePokemon(pokemon.name)}
                                    alt={pokemon.name}
                                />
                                 - {pokemon?.name}
                            </CardTitle>
                            <div className="d-flex align-items-center">
                                {pokemon.types.map((type) => <Badge key={type} color="link" style={{color: 'white', backgroundColor: getTypeColor(pokemon?.types)}}>{type}</Badge>)}    
                            </div>
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