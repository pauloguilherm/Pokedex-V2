import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Badge} from 'reactstrap';
import React from 'react';
import PropTypes from 'prop-types';

const genericModal = ({isOpen, setIsOpen, data}) => {
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
    return(
    <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
        <ModalHeader>
            <h6>{data?.name}</h6>
            <span>{data.types.map((type)=> (<Badge color={typeStyle(type)}>{type}</Badge>))}</span>
        </ModalHeader>
        <ModalBody className="d-flex justify-content-center">
            <img src={data?.img} alt={data.name}/>
            <div className="container-status">
                {data?.statistcs?.map((stat, key)=> (
                    <span key={key}> {stat.name.toUpperCase()} : {stat.status} </span>
                ))}
            </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-start">
        </ModalFooter>
    </Modal>
     )
};

genericModal.propTypes = {
    isOpen: PropTypes.bool,
    setIsoOpen: PropTypes.func,
    data: PropTypes.object,
};

export default genericModal;