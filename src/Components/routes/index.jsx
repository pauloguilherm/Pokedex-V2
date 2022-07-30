import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from '@Components/Navbar';
import Home from '@Pages/Home';
import SignIn from '@Pages/SignIn';
import SignUp from '@Pages/SignUp';


const Rotas = () => (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Home />}/>
             <Route exact path="/signIn" element={<SignIn />} />
             <Route exact path="/signUp" element={<SignUp />} />
        </Routes>
    </BrowserRouter>
);

export default Rotas;