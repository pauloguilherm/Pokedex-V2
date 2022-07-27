import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import React, {useState, memo, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import {CgCloseO} from 'react-icons/cg';


import {getEvolutions, getAllPokes} from '@Hooks/api';
import {getTypeColor} from '@Utils/customizes';

function GenericModal ({isOpen, setIsOpen, data}) {
    const [pokeData, setPokeData] = useState([]);

    const handleValidateEvolution = (dataID, evolutionID) => evolutionID * 3 === dataID;

    const evolutions = async() =>{
        let evolutions = await getEvolutions(data.id);
        let firstEvolution = evolutions.data.chain.evolves_to[0].species;
        let firstEvolutionImg = await getAllPokes(firstEvolution.name).then((res)=> res.data.sprites.front_default);
        let secondEvolution = evolutions.data.chain.evolves_to[0].evolves_to[0].species;
        let secondEvolutionImg = await getAllPokes(secondEvolution.name).then((res)=> res.data.sprites.front_default);
        const evolutionsObj = [
            {
            name: firstEvolution.name,
            img: firstEvolutionImg,
            visible: handleValidateEvolution(data.id, evolutions.data.id)
            },
            {
            name: secondEvolution.name,
            img: secondEvolutionImg,
            },
        ];
        setPokeData(evolutionsObj);
    };


    useEffect(()=> {
        evolutions();
    }, [data.id]);
    return(
    <Modal isOpen={isOpen} toggle={() => setIsOpen(prev => !prev)}>
        <ModalHeader style={{backgroundColor: getTypeColor(data?.types) }}>
            <strong>{data?.name.toUpperCase()}</strong>
            <Button color="black" onClick={()=> setIsOpen(prev => !prev)}><CgCloseO/></Button>
        </ModalHeader>
        <ModalBody className="d-flex justify-content-center">
            <img src={data?.img} alt={data.name}/>
            <div className="container-status">
                {data?.statistcs?.map((stat, key)=> (
                    <strong key={key}> {stat.name.toUpperCase()} : {stat.status} </strong>
                ))}
            </div>
        </ModalBody>
        <ModalFooter className="d-flex">
            {!pokeData[0]?.visible && <h4 className="d-flex justify-content-flex-start">Evolutions</h4>}
                {pokeData?.map((evolution) => {
                    if(evolution.name === data.name || evolution.visible) return;
                    return(
                        <div className="d-flex flex-direction-column-reverse">
                        <strong>{evolution.name}</strong>
                        <img src={evolution.img} alt={evolution.name}/>
                        </div>
                    )
                })}
            <div>
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