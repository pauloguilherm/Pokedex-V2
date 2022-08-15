import {useEffect, useState, useContext, useCallback} from 'react';
import {toast} from 'react-toastify';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {AiOutlineArrowLeft} from 'react-icons/ai';


import {getAllPokes} from '@Hooks/api';
import {getFavorites, deleteFavorite} from '@Hooks/pokemons';
import {AppContext} from '@Components/Container';

import ClosedPokeBall from '@Assets/pokeBolaFechada.png'
import Pokedex from '@Assets/pokedex.png';

export default function Favorites () {
    const [favorites, setFavorites] = useState([]);
    const {userData} = useContext(AppContext);
 
    useEffect(()=> {
        if(!userData) return;
        (async ()=> {
            const favoritesToDisplay = [];   
            const {data: {data : favorites}} = await getFavorites(userData.id);

            if(!favorites) return;
            favorites.forEach(async(favorite, index) => {
                const {data} = await getAllPokes(favorite?.name);
                
                favoritesToDisplay[index] = { 
                    id: favorite?.id,
                    name: favorite?.name,  
                    img: data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'], 
                };  
            })
        setTimeout(()=> {
            setFavorites(favoritesToDisplay);
        }, 500); 
        })();
    }, [userData]);

    const deletePokemon = useCallback(async (name)=> {
        const saveObj = {
            name: name,
            coach: userData.name,
            coachId: userData.id,
        };
        const {data} = await deleteFavorite(saveObj);
        if(!data.success){
            return toast.error(data.message);
        };
        
        setFavorites(prev => prev.filter(pokemon => pokemon.name !== name));
        return toast.success(data.message);
    }, [userData, setFavorites]);

    return (
        <>
            <div className="d-flex justfy-content-center flex-column h-100"> 
                    <div className="mt-5 w-100 d-flex justify-content-start arrow-back-to-home">
                        <Link to="/app" title="Back to Home">
                            <AiOutlineArrowLeft size="50" color="black"/>
                        </Link>
                    </div>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    {favorites?.map((favorite)=> (
                        <div className="p-5 mt-5">
                            <img src={favorite?.img} style={{marginTop: '70px', marginLeft: '49px', position: 'absolute', width: '65px'}}/>

                            <Button color="link" onClick={()=> deletePokemon(favorite?.name)} style={{marginTop: '180px', marginLeft: '49px', position: 'absolute', width: '65px'}}>
                                <img src={ClosedPokeBall}/>
                            </Button>
                            <img src={Pokedex} style={{width: '180px'}}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};