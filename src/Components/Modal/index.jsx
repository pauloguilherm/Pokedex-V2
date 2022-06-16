import {Modal, ModalHeader, ModalBody, ModalFooter, Badge} from 'reactstrap';
import {getEvolutions, getAllPokes} from '../../Service/api';
import React, {useState, memo, useCallback} from 'react';
import PropTypes from 'prop-types';

const GenericModal = ({isOpen, setIsOpen, data}) => {
    const [pokeData, setPokeData] = useState([]);
    const typeStyle = (type) => {
        switch(type) {
            case 'normal':
                return 'primary';
            case 'fighting':
                return 'danger';
            case 'flying':
                return 'info';
            case 'poison':
                return 'warning';
            case 'ground':
                return 'secondary';
            case 'rock':
                return 'dark';
            case 'bug':
                return 'success';
            case 'ghost':
                return 'light';
            case 'steel':
                return 'secondary';
            case 'fire':
                return 'danger';
            case 'water':
                return 'primary';
            case 'grass':
                return 'success';
            case 'electric':
                return 'warning';
            case 'psychic':
                return 'info';
            case 'ice':
                return 'primary';
            case 'dragon':
                return 'info';
            case 'dark':
                return 'dark';
            case 'fairy':
                return 'warning';
            default:
                return 'secondary';
        }
    };

    const evolutions = useCallback(async() =>{
        let evolutions = await getEvolutions(data.id);
        let firstEvolution = evolutions.data.chain.evolves_to[0].species;
        let firstEvolutionImg = await getAllPokes(firstEvolution.name).then((res)=> res.data.sprites.front_default);
        let secondEvolution = evolutions.data.chain.evolves_to[0].evolves_to[0].species;
        let secondEvolutionImg = await getAllPokes(secondEvolution.name).then((res)=> res.data.sprites.front_default);
        const evolutionsObj = {
            firstEvolution: {
                name: firstEvolution.name,
                img: firstEvolutionImg,
            },
            secondEvolution: {
                name: secondEvolution.name,
                img: secondEvolutionImg,
            },
        };
        setPokeData(evolutionsObj);
    }, [data.id]);

    evolutions()
    return(
    <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
        <ModalHeader>
            <span>{data?.name}</span>
            <span>{data.types.map((type, key)=> (<Badge key={key} color={typeStyle(type)}>{type}</Badge>))}</span>
        </ModalHeader>
        <ModalBody className="d-flex justify-content-center">
            <img src={data?.img} alt={data.name}/>
            <div className="container-status">
                {data?.statistcs?.map((stat, key)=> (
                    <span key={key}> {stat.name.toUpperCase()} : {stat.status} </span>
                ))}
            </div>
        </ModalBody>
        <ModalFooter className="d-flex">
            <h4 className="d-flex justify-content-flex-start">Evolutions</h4>
            <div>
                <span>{pokeData?.firstEvolution?.name}</span>
                <img src={pokeData?.firstEvolution?.img} alt={pokeData?.firstEvolution?.name}/>
            </div>
            <div>
                <span>{pokeData?.secondEvolution?.name}</span>
                <img src={pokeData?.secondEvolution?.img} alt={pokeData?.secondEvolution?.name}/>
            </div>
        </ModalFooter>
    </Modal>
     )
};

GenericModal.propTypes = {
    isOpen: PropTypes.bool,
    setIsoOpen: PropTypes.func,
    data: PropTypes.object,
};

export default memo(GenericModal);