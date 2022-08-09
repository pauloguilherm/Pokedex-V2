import {useEffect, useState, useContext, useCallback} from 'react';
import {Card, CardTitle, CardBody, CardFooter, CardImg} from 'reactstrap';
import {toast} from 'react-toastify';

import {getAllPokes} from '@Hooks/api';
import {getFavorites, deleteFavorite} from '@Hooks/pokemons';
import {AppContext} from '@Components/Container';

import ClosedPokeBall from '@Assets/pokeBolaFechada.png'

export default function Favorites () {
    const [favorites, setFavorites] = useState([]);
    const {userData} = useContext(AppContext);
    useEffect(()=> {
        (async ()=> {
            const favoritesToDisplay = [];   
            const {data: {data : favorites}} = await getFavorites(userData.id);

            favorites.forEach(async(favorite, index) => {
                const {data} = await getAllPokes(favorite?.name);
                
                if(favoritesToDisplay.includes(favorite)) return; 
                favoritesToDisplay[index] = { 
                    id: favorite?.id,
                    name: favorite?.name,  
                    img: data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'], 
                };
        })
        setTimeout(()=> {
            setFavorites(prev => [...prev, ...favoritesToDisplay]);
        }, 400);
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
    }, [userData]);

    return (
        <div className="d-flex justify-content-center align-items-center flex-wrap" style={{height:'100vh'}}> 
            {favorites?.map((favorite)=> (
                <div className="sub-container-favorites">
                    <Card classNmae="p-2 flex-fill bd-highlight">

                        <CardTitle className="text-center">
                            <strong>{favorite.name}</strong>
                        </CardTitle>
                        
                        <CardBody style={{backgroundColor: '#72a6af9e'}}>
                            <CardImg key={favorite?.id} alt={favorite?.name} src={favorite?.img} />
                        </CardBody>

                        <CardFooter className="d-flex justify-content-center">
                            <img className="cursor-pointer" onClick={()=> deletePokemon(favorite.name)} src={ClosedPokeBall}/>
                        </CardFooter>
                    </Card> 
                </div>
            ))}
        </div>
    )
};