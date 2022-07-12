import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from '../Navbar';
import Home from '../Home';


const Rotas = () => (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Home />}/>
            {/*  <Route exact path="/pokemon/:id" element={<Pokemon />} /> */}
            {/*  <Route path="*" element={<Error />} /> */}
        </Routes>
    </BrowserRouter>
);

export default Rotas;