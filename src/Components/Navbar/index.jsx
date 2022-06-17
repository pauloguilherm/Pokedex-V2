import {Nav, NavItem, Input, Button, Form} from "reactstrap";
import {AppContext} from '../Container';
import {useContext, useRef} from 'react';
import {FaSearch} from 'react-icons/fa';

const NavBar = () => {
    const {setSearch} = useContext(AppContext);
    const formRef = useRef(null);

    const handleSubmitForm = (payload) => {
      payload.preventDefault();
      setSearch(payload.target[0].value);
      payload.target[0].value = "";
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