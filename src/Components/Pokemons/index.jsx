import {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardBody, CardImg, CardTitle, Button} from 'reactstrap';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {getAllPokes} from '../../Hooks/api';
import {AppContext} from '../Container';
import {useContext} from 'react';
import Modal from '../Modal';
import {getStatistcs, getType, getTypeColor} from '../../Hooks/customizes';

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
                {search?.search && <Button className="d-flex justify-content-start " color="link" onClick={()=> {loadData(); setSearch(false);}}><AiOutlineArrowLeft size="50"/></Button>}
                <Card>
                    {pokemon?.id === openModal && <Modal isOpen={pokemon?.id === openModal} setIsOpen={setOpenModal} data={pokemon} />}
                    <CardHeader style={{ backgroundColor: getTypeColor(pokemon?.types) }}>
                        <CardImg src={pokemon?.img} alt={pokemon?.name} />
                    </CardHeader>
                    <CardBody className={!search?.search ? 'card-search' : ''}>
                        <CardTitle>{pokemon?.name} - 00{pokemon?.id}</CardTitle>
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
};