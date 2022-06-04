import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Home from '../Components/Home';


const Rotas = () =>{

    return(
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />}/>
               {/*  <Route exact path="/pokemon/:id" element={<Pokemon />} /> */}
               {/*  <Route path="*" element={<Error />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;