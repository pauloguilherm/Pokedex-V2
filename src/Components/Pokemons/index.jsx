import {useState, useEffect, useCallback, useContext} from 'react';
import {Card, CardHeader, CardBody, CardImg, CardTitle, Button, Badge} from 'reactstrap';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import PropTypes from 'prop-types';


import {AppContext} from '@Components/Container';
import {Modal} from '@Components';
import {getAllPokes} from '@Hooks/api';
import {getStatistcs, getType, getTypeColor} from '@Utils/customizes';

export default function Pokemons({data, loadData}){
    const {search, setSearch} = useContext(AppContext);
    const [pokemons, setPokemons] = useState([]);
    const [openModal, setOpenModal] = useState();

    useEffect(()=> {
        if(search?.search) setPokemons([search]);
    }, [search])

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
                            <CardTitle>{pokemon?.name} - 00{pokemon?.id}</CardTitle>
                            {pokemon.types.map((type) => <Badge key={type} color="link" style={{color: 'white', backgroundColor: getTypeColor(pokemon?.types)}}>{type}</Badge>)}
                        </div>
                        <>
                            <Button style={{backgroundColor: getTypeColor(pokemon?.types)}} onClick={() => setOpenModal(pokemon?.id)}>Infos</Button>
                        </>
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