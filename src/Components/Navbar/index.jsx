import { Nav, NavItem, Input } from "reactstrap";
import {AppContext} from '../Container';
import {useContext} from 'react';

const NavBar = () => {
    const {search, setSearch} = useContext(AppContext);
    return (
      <Nav>
          <NavItem>LOGO POKEDEX</NavItem>
          <div className="nav-container-right">
              <NavItem>
                <Input type="text" placeholder="Search..."/>
              </NavItem>
              <NavItem>POKEBAG</NavItem>
          </div>
      </Nav>
    );
}

export default NavBar;