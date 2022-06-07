import {useState, useEffect, useCallback} from 'react';
import {Card, CardHeader, CardBody, CardFooter, CardImg, CardTitle, Button, CardColumns, Row} from 'reactstrap';
import {getAllPokes} from '../../Service/api';


export default function Pokemons({data}){
    const [pokemons, setPokemons] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getAll = useCallback(() =>{
        data?.map(async(poke) => {
           const data = await getAllPokes(poke.name)
           const pokeObj = {
                name: poke.name,
                img: data.data.sprites.other.dream_world.front_default
           }
           setPokemons((state)=> [...state, pokeObj]);
        }); 
    }, [data]);

    useEffect(getAll, [getAll]);

    return(
        <div className="container-pokemons"> 
            {pokemons?.map((item, key)=> (
                <Card key={key}>
                    <CardHeader>
                        <CardImg src={item?.img} alt={item.name} />
                    </CardHeader>
                    <CardBody>
                        <CardTitle>{item?.name}</CardTitle>
                        <Button color="primary">Infos</Button>
                    </CardBody>
                    <CardFooter>
                    </CardFooter> 
                </Card>
            ))}
        </div>
    )
}