import Navbar from "./Navbar"
import Services from "./Services"
import Products from "./Products"

import "./css/mainpage.css"
import React from "react"

export default function MainPage() {

    const [serviceExpand, setServiceExpand] = React.useState(false)



    return (
        <>
            <div className="main-contaner">
                <div className="main-nav-container">
                    <Navbar />

                </div>
                <h2 className="navbar-logo">maya henna</h2>


                <h1 className="services-heading">Our Services</h1>
                <div className="main-services-container">
                    
                    <Services setServiceExpand={setServiceExpand}/>

                </div>

                <div className="main-product-container">
                    <Products />
                </div>


            </div>
        </>
    )
}