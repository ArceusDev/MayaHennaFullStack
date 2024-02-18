import React from "react"
// import service from "./serviceData.json"
import "./css/services.css"

import PropTypes from 'prop-types';



export default function Services(props) {

    const [ service, setServices ] = React.useState(null)

    React.useEffect(()=>{
        async function fetchServices(){
            try {
                    const response = await fetch("https://localhost:7086/api/Service",{
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const data = await response.json();
                    setServices(data)
                }
            catch (error) {
                console.error("Error fetching services:", error);
            }
        }

        fetchServices()

    },[])



    console.log(service);

    let serviceList = []
    let fetchLinmit = 0

    if(service !== null){

        props.serviceExpand ? fetchLinmit = service.length : fetchLinmit = 5

        serviceList = service.slice(0,fetchLinmit).map(ele => (
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
        
    }else{
        serviceList = <h2>loading</h2>
    }

    return (
        <>
                {serviceList}
        </>
    )
}



Services.propTypes = {
    serviceExpand: PropTypes.bool,
};