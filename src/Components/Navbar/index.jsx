import {useRef, useContext, useCallback} from 'react';
import {Nav, NavItem, Button} from "reactstrap";
import {Link} from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';
import {RiUser3Line} from 'react-icons/ri';
import {BsArrowRightCircle} from 'react-icons/bs';
import {toast} from 'react-toastify';
import {Form} from '@unform/web';


import {getAllPokes} from '@Hooks/api';
import {logout} from '@Auth';
import {getType, getStatistcs} from '@Utils/customizes'
import {AppContext} from '@Components/Container';
import {Input} from '@Components/Form'
import PokeBag from '@Assets/pokebag.png';

const NavBar = () => {
    const formRef = useRef(null);
    const {setSearch} = useContext(AppContext);
  
    const handleSubmitForm = useCallback(async ({name}) => {
      const data = await getAllPokes(name)
      .then(res => res.data)
      .catch(err => err);
      if(data.name !== name){
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
    setSearch(newObj);

  }, [setSearch, getAllPokes]);

  return (
      <Nav className="navbar-dark bg-dark fixed-top">
          <NavItem className="pokeBag-container">
            <Link to="/app/Auth/signIn">
              <RiUser3Line  title="LogIn" color="white" size="small" style={{width: '30px', marginRight: '20px'}} />
            </Link>
              <Link to="/app/favorites">
                <img title="Favorites" className="pokeBag" src={PokeBag} alt="Pokebag"/>
              </Link>
          </NavItem>
          <div className="nav-container-right">
              <NavItem>
                <Form onSubmit={handleSubmitForm} ref={formRef}>
                  <Input name="name" placeholder="Search..." size="small"/>
                  <Button type="submit" color="link" className="btn-search">
                    <FaSearch color='white'/>
                  </Button>
                </Form>
              </NavItem>
              <BsArrowRightCircle color="white" className="cursor-pointer" onClick={logout}/>
          </div>
      </Nav>
    );
}

export default NavBar;