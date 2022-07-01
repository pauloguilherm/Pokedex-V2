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
            {pokemons?.map((item) => (
                <>
                {search?.search && <Button className="d-flex justify-content-start " color="link" onClick={()=> {loadData(); setSearch(false);}}><AiOutlineArrowLeft size="50"/></Button>}
                <Card key={item?.id}>
                    {item?.id === openModal && <Modal isOpen={item?.id === openModal} setIsOpen={setOpenModal} data={item} />}
                    <CardHeader style={{ backgroundColor: getTypeColor(item.types) }}>
                        <CardImg src={item?.img} alt={item?.name} />
                    </CardHeader>
                    <CardBody className={!search?.search ? 'card-search' : ''}>
                        <CardTitle>{item?.name} - 00{item?.id}</CardTitle>
                        <Button color="primary" onClick={() => setOpenModal(item?.id)}>Infos</Button>
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