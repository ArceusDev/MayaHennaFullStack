import Navbar from "../../Components/Navbar/Navbar"
import Services from "../../Components/Services/Services"
import Products from "../../Components/Products/Products"

import "./MainPage.css"
import React from "react"


export default function MainPage() {

    const [serviceExpand, setServiceExpand] = React.useState(false)

    const [productExpand, setProductExpand] = React.useState(false)

    function resetToMainPage() {
        setServiceExpand(false)
        setProductExpand(false)
    }

    return (
        <>
            <div className="main-contaner">
                <div className="main-nav-container">
                    <Navbar
                        setServiceExpand={setServiceExpand}
                        setProductExpand={setProductExpand}
                    />
                </div>
                <h2 className="navbar-logo" onClick={() => { resetToMainPage() }}>maya henna</h2>
                {serviceExpand === true ? (
                    <>
                        <h1 className="services-heading" id="services-heading">Our Services</h1>
                        <div className="main-services-container">
                            <Services serviceExpand={serviceExpand} />
                        </div>
                    </>
                ) : productExpand === true ? (
                    <>
                        <h1 className="product-heading">Our Products</h1>
                        <div className="main-product-container">
                            <Products productExpand={productExpand} />
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="services-heading">Our Services</h1>
                        <div className="main-services-container">
                            <Services serviceExpand={serviceExpand} />
                        </div>

                        <h1 className="product-heading">Our Products</h1>
                        <div className="main-product-container">
                            <Products productExpand={productExpand} />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}