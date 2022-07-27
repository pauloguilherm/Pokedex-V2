import {useRef, useContext} from 'react';
import {Nav, NavItem, Input, Button, Form} from "reactstrap";
import {Link} from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';
import {toast} from 'react-toastify';


import {getAllPokes} from '@Hooks/api';
import {getType, getStatistcs} from '@Utils/customizes'
import {AppContext} from '@Components/Container';
import PokeBag from '@Assets/pokebag.png';

const NavBar = () => {
    const formRef = useRef(null);
    const {setSearch} = useContext(AppContext)
  
    const handleSubmitForm = async(payload) => {
      payload.preventDefault();
      const pokeName = payload.target[0].value.toLowerCase();
      const data = await getAllPokes(pokeName)
      .then(res => res.data)
      .catch(err => err);
      if(data.name === "AxiosError"){
        toast.error('Pokemon not found');
        return setSearch({error: true}); 
    };
      const newObj =
        {
        id: data.id,
        name: data.name,
        img: data.sprites.other.dream_world.front_default,
        statistcs: getStatistcs(data.stats),
        types: getType(data),
        search: true,
    };
    setSearch(newObj)
  };

  return (
      <Nav className="navbar-dark bg-dark fixed-top">
          <NavItem className="pokeBag-container">
              <Link to="/favorites"><img className="pokeBag" src={PokeBag} alt="Pokebag"/></Link>
          </NavItem>
          <div className="nav-container-right">
              <NavItem>
                <Form onSubmit={handleSubmitForm} ref={formRef}>
                  <Input type="text" name="search" placeholder="Search..." />
                  <Button type="submit" color="link"><FaSearch style={{color: 'white'}}/></Button>
                </Form>
              </NavItem>
          </div>
      </Nav>
    );
}

export default NavBar;