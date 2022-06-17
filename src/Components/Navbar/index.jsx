import {Nav, NavItem, Input, Button} from "reactstrap";
import {AppContext} from '../Container';
import {useContext, useRef} from 'react';
import {FaSearch} from 'react-icons/fa';
const NavBar = () => {
    const {setSearch} = useContext(AppContext);
    const formRef = useRef(null);

    const handleSubmitForm = (payload) => {
      payload.preventDefault();
      setSearch(payload.target[0].value);
    };

  return (
      <Nav>
          <NavItem>LOGO POKEDEX</NavItem>
          <div className="nav-container-right">
              <NavItem>
                <form onSubmit={handleSubmitForm} ref={formRef}>
                  <Input type="text" name="search" placeholder="Search..." />
                  <Button type="submit" color="link"><FaSearch /></Button>
                </form>
              </NavItem>
              <NavItem>POKEBAG</NavItem>
          </div>
      </Nav>
    );
}

export default NavBar;