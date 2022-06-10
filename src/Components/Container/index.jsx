import React, {useState}from 'react';

export const AppContext = React.createContext({})

export const AppProvider = (props) => {
    const [search, setSearch] = useState();
    return(
        <AppContext.Provider value={{search, setSearch}}>
            {props.children}
        </AppContext.Provider>
    )
};