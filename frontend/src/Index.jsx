import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/LoginPage/LoginPage'
import MainPage from './Pages/MainPage/MainPage'
import Dashboard from './Pages/DashboardPage/Dashboard'
import React from 'react'

export default function Index() {
    // const [bearer, setBearer] = React.useState("")
    // React.useEffect(()=>{
    //     setBearer(localStorage.getItem('Bearer'))

    // })

    return (
        <>
            <BrowserRouter>
                {/* <Link to="/login">login</Link>
                <Link to="/mainpage">mainPage</Link>
                <Link to="/dashboard">dashboard</Link> */}

                <Routes>
                    <Route path='/' element={<MainPage />}></Route>
                    <Route path='/login' element={<Login />}></Route>


                    {
                        localStorage.getItem('Bearer') ? <Route path='/dashboard' element={<Dashboard />}></Route> : <Route path='/login' element={<Login />}></Route>

                    }



                </Routes>

            </BrowserRouter>
            {/* <h1>this is intro page(Index page) </h1> */}
        </>

    )
}