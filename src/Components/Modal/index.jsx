import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import React, {useState, useEffect, useMemo} from 'react';
import {PropTypes} from 'prop-types';
import {CgCloseO} from 'react-icons/cg';


import {getEvolutions, getAllPokes} from '@Hooks/api';
import {getTypeColor} from '@Utils/customizes';

function GenericModal ({isOpen, setIsOpen, data}) {
    const [pokeData, setPokeData] = useState([]);

    const handleValidateEvolution = (dataID, evolutionID) => evolutionID * 3 === dataID;

    const evolutions = async () =>{
        const evolutions = await getEvolutions(data.id);
        const firstEvolution = evolutions.data.chain.evolves_to[0].species;
        const firstEvolutionImg = await getAllPokes(firstEvolution.name).then((res)=> res.data.sprites.front_default);
        const secondEvolution = evolutions.data.chain.evolves_to[0].evolves_to[0].species;
        const secondEvolutionImg = await getAllPokes(secondEvolution.name).then((res)=> res.data.sprites.front_default);
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
    }, [data]);

    const closeIcon = useMemo(()=> <CgCloseO 
    onClick={()=> setIsOpen(prev => !prev)}
    color="black"
    className="cursor-pointer"
    />, [setIsOpen]);

    return(
    <Modal isOpen={isOpen} toggle={() => setIsOpen(prev => !prev)}>
        <ModalHeader close={closeIcon} style={{backgroundColor: getTypeColor(data?.types)}}>
            {data?.name.toUpperCase()}
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

export default GenericModal;