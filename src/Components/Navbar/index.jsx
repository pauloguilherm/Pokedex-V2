import {Nav, NavItem, Input, Button, Form} from "reactstrap";
import {useRef, useContext} from 'react';
import {AppContext} from '../Container';
import {FaSearch} from 'react-icons/fa';
import {toast} from 'react-toastify';
import {getAllPokes} from '../../Hooks/api';
import {getType, getStatistcs} from '../../Hooks/customizes'

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
      <Nav>
          <NavItem>MENU</NavItem>
          <div className="nav-container-right">
              <NavItem>
                <Form onSubmit={handleSubmitForm} ref={formRef}>
                  <Input type="text" name="search" placeholder="Search..." />
                  <Button type="submit" color="link"><FaSearch /></Button>
                </Form>
              </NavItem>
              <NavItem>POKEBAG</NavItem>
          </div>
      </Nav>
    );
}

export default NavBar;