import { Nav, NavItem } from "reactstrap"
const navBar = () => {
    return (
      <Nav>
          <NavItem>LOGO POKEDEX</NavItem>
          <div className="nav-container-right">
              <NavItem>INPUT</NavItem>
              <NavItem>POKEBAG</NavItem>
          </div>
      </Nav>
    );
}

export default navBar;