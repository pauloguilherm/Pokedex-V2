import React, {useState}from 'react';

export const AppContext = React.createContext({})

export const AppProvider = (props) => {
    const [search, setSearch] = useState();
    const [limitPokemons, setLimitPokemons] = useState(9);
    return(
        <AppContext.Provider value={{search, setSearch, limitPokemons, setLimitPokemons}}>
            {props.children}
        </AppContext.Provider>
    )
};