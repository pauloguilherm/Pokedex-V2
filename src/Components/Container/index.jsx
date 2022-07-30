import React, {useState}from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext({})

export function AppProvider (props) {
    const [search, setSearch] = useState();
    const [limitPokemons, setLimitPokemons] = useState(9);
    const [token, setToken] = useState('');
    return(
        <AppContext.Provider value={{search, setSearch, limitPokemons, setLimitPokemons, token, setToken}}>
            {props.children}
        </AppContext.Provider>
    )
};

AppProvider.propTypes = {
    props: PropTypes.object,
}
