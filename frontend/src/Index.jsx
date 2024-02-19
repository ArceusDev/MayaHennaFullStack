import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import MainPage from './components/MainPage'


export default function Index() {
    return (
        <>
            <BrowserRouter>
                {/* <Link to="/login">login</Link>
                <Link to="/mainpage">mainPage</Link> */}

                <Routes>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/mainPage' element={<MainPage />}></Route>
                </Routes>

            </BrowserRouter>
            {/* <h1>this is intro page(Index page) </h1> */}
        </>

    )
}