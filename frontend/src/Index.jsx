import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/LoginPage/LoginPage'
import MainPage from './Pages/MainPage/MainPage'


export default function Index() {
    return (
        <>
            <BrowserRouter>
                {/* <Link to="/login">login</Link>
                <Link to="/mainpage">mainPage</Link> */}

                <Routes>
                    <Route path='/' element={<MainPage />}></Route>
                    <Route path='/login' element={<Login />}></Route>                   
                </Routes>

            </BrowserRouter>
            {/* <h1>this is intro page(Index page) </h1> */}
        </>

    )
}