// import PropTypes from 'prop-types';
import React from "react"
import service from "./serviceData.json"
import "./css/services.css"


export default function Servics(props) {

    

    // const [ service, setServices ] = React.useState()


    let serviceList = service.items.map(ele => (
        <div key={ele.id} className="services-container">
            <div className="service-info">
                <h3 className="service-title">{ele.title}</h3>
                <p className="service-description">{ele.description}</p>
            </div>
            <div className="service-price">
                <button className="price-btn">
                    <span>${ele.price}</span>

                </button>
            </div>

        </div>
    ))

    return (
        <>
            {/* <h2>Services</h2> */}
            {/* <div className="main-services-container">
            </div> */}
                {serviceList}
        </>
    )
}


// Tittlepage.propTypes = {
//     titleData: PropTypes.array.isRequired,
//     setData: PropTypes.func.isRequired,
// };