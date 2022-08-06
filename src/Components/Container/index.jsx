import React, {useState, useEffect}from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext({})

export function AppProvider (props) {
    const [search, setSearch] = useState();
    const [limitPokemons, setLimitPokemons] = useState(9);
    const [userData, setUserData] = useState({});

    useEffect(()=> {
        const data = JSON.parse(localStorage.getItem('user'));
        if(!data) return;
        setUserData(data.user);
    }, [props]);

    return(
        <AppContext.Provider value={{search, setSearch, limitPokemons, setLimitPokemons, userData, setUserData}}>
            {props.children}
        </AppContext.Provider>
    )
};

AppProvider.propTypes = {
    props: PropTypes.object,
}
