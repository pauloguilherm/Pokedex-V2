import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@Components/Navbar';
import Home from '@Pages/Home';
import SignIn from '@Pages/SignIn';
import SignUp from '@Pages/SignUp';
import Favorites from '@Pages/Favorites';

const Rotas = () => (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Navigate to="/app"/>} />
            <Route exact path="/app" element={<Home />}/>
             <Route exact path="/app/Auth/signIn" element={<SignIn />} />
             <Route exact path="/app/Auth/signUp" element={<SignUp />} />
             <Route exact path="/app/favorites" element={<Favorites />} />
        </Routes>
    </BrowserRouter>
);

export default Rotas;