import {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardBody, CardImg, CardTitle, Button} from 'reactstrap';
import {getAllPokes} from '../../Service/api';
import Modal from '../Modal';

export default function Pokemons({data}){
    const [pokemons, setPokemons] = useState([]);
    const [openModal, setOpenModal] = useState();

    const getAll = useCallback(() =>{
        data?.map(async(poke) => {
           const data = await getAllPokes(poke.name)
           const pokeObj = {
                name: poke.name,
                img: data.data.sprites.other.dream_world.front_default,
                statistcs: getStatistcs(data.data.stats),
                types: getType(data.data),
           }
           setPokemons((state)=> [...state, pokeObj]); 
        }); 
    }, [data]);

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

    useEffect(getAll, [getAll]);

    return(
        <div className="container-pokemons"> 
            {pokemons?.map((item, key)=> (
                <Card key={key}>
                    {openModal === item.name && <Modal isOpen={true} setIsOpen={setOpenModal} data={item}/>}
                    <CardHeader>
                        <CardImg src={item?.img} alt={item.name} />
                    </CardHeader>
                    <CardBody>
                        <CardTitle>{item?.name}</CardTitle>
                        <Button color="primary" onClick={()=> setOpenModal(item.name)}>Infos</Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
};

Pokemons.propTypes = {
    data: PropTypes.array.isRequired,
};