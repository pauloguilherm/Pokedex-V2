import {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardBody, CardImg, CardTitle, Button} from 'reactstrap';
import {getAllPokes} from '../../Service/api';
import Modal from '../Modal';

export default function Pokemons({data}){
    const [pokemons, setPokemons] = useState([]);
    const [openModal, setOpenModal] = useState();

    const getAll = useCallback(() =>{
        const pokeObj = []
        data?.forEach(async(poke) => {
           const data = await getAllPokes(poke.name)
           pokeObj.push(
            {
                id: data.data.id,
                name: poke.name,
                img: data.data.sprites.other.dream_world.front_default,
                statistcs: getStatistcs(data.data.stats),
                types: getType(data.data),
           }
           )
        }); 
        console.log(pokeObj)
        setTimeout(setPokemons(pokeObj), 5000);
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

    return(
        <div className="container-pokemons">
            {pokemons?.map((item) => (
                <Card key={item.id}>
                    {openModal === item.name && <Modal isOpen={true} setIsOpen={setOpenModal} data={item} />}
                    <CardHeader style={{ backgroundColor: getTypeColor(item.types) }}>
                        <CardImg src={item?.img} alt={item.name} />
                    </CardHeader>
                    <CardBody>
                        <CardTitle>{item?.name} - 00{item?.id}</CardTitle>
                        <Button color="primary" onClick={() => setOpenModal(item.name)}>Infos</Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
};

Pokemons.propTypes = {
    data: PropTypes.array.isRequired,
};