import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from '@Components/Navbar';
import Home from '@Pages/Home';
import SignIn from '@Pages/SignIn';
import SignUp from '@Pages/SignUp';
import Favorites from '@Pages/Favorites';

export default function Rotas () {

    return(
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Navigate to="/app"/>} />
            <Route path="/app" element={<Home />}/>
             <Route path="/app/Auth/signIn" element={<SignIn />} />
             <Route path="/app/Auth/signUp" element={<SignUp />} />
             <Route path="/app/favorites" element={<Favorites />} />
        </Routes>
    </BrowserRouter>
    )
};  