import React, {useState, useEffect, createContext}from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext({})

export function AppProvider (props) {
    const [search, setSearch] = useState();
    const [limitPokemons, setLimitPokemons] = useState(9);
    const [userData, setUserData] = useState({});

    useEffect(()=> {
        const data = JSON.parse(sessionStorage.getItem('user'));
        if(!data) return;
        setUserData(data.user);
    }, []);

    return(
        <AppContext.Provider value={{search, setSearch, limitPokemons, setLimitPokemons, userData, setUserData}}>
            {props.children}
        </AppContext.Provider>
    )
};

AppProvider.propTypes = {
    props: PropTypes.object,
}
