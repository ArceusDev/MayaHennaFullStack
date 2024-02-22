import React from "react"
import PropTypes from 'prop-types';

import "./EditServiceForm.css"



export default function EditServiceForm(props) {
    const serviceId = props.serviceID;

    const [msg, setMsg] = React.useState(null)

    const [serviceObj, setServiceObj] = React.useState(
        {
            title: "",
            description: "",
            price: "",
            type: "",
        }
    )



    function getServiceData() {
        console.log(serviceId);
        fetch(`http://localhost:5036/api/Service/${serviceId}`)
            .then((response) => response.json())
            .then(data => {
                setServiceObj(prevPost => ({
                    ...prevPost,
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    type: data.type,
                }));
            });
    }
    React.useEffect(() => {
        if (serviceId !== null) {

            getServiceData()

        } else setServiceObj(
            {
                title: "",
                description: "",
                price: "",
                type: ""
            }
        )
        setMsg(null)

    }, [serviceId])



    function handleSubmit(event) {
        event.preventDefault()



        if (serviceId !== null) {  //update service

            fetch(`http://localhost:5036/api/Service/${serviceId}`, {
                method: "PUT",
                body: JSON.stringify(serviceObj),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('Bearer')}`
                }
            })
            .then(res => {
                if (res.ok) { 
                    return res.json()
                } else {
                    throw new Error("Failed to update service")
                }
            })
            .then(data => {
                setMsg("Service details updated")
            })
            .catch(error => {
                console.error("Error updating service:", error)
                setMsg("Some error occurred updating service")
            })

            


        } else {      //add new service in this case

            fetch(`http://localhost:5036/api/Service`, {
                method: "POST",
                body: JSON.stringify(serviceObj),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('Bearer')}`
                }
            })
            .then(res => {
                if (res.ok) { 
                    return res.json()
                } else {
                    throw new Error("Failed to update service")
                }
            })
            .then(data => {
                setMsg("New Service added")
            })
            .catch(error => {
                console.error("Error updating service:", error)
                setMsg("Some error occurred adding new service")
            })


        }



    }

    function handleChange(event) {
        const { name, value } = event.target
        setServiceObj((prePost) => {
            return {
                ...prePost,
                [name]: value,
            }
        })
        setMsg(null)
    }

    function closeForm() {
        props.setServiceForm(false)
    }


    return (
        <>
            <div className="overlay-div">

                <div className="form-div">

                    <button className="close-form" onClick={() => { closeForm() }}> X </button>

                    <form className="form" onSubmit={handleSubmit}>
                        {serviceId === null ? <h3>Create new service</h3> : <h3>{`update service# ${serviceId}`}</h3>}

                        <input
                            id="title-input"
                            type="text"
                            name="title"
                            value={serviceObj.title}
                            onChange={handleChange}
                            placeholder="Enter service for title"
                            required

                        />

                        <input
                            id="price-input"
                            type="number"
                            name="price"
                            value={serviceObj.price}
                            onChange={handleChange}
                            placeholder="Enter price for serice"
                            required

                        />
                        <input
                            id="type-input"
                            type="text"
                            name="type"
                            value={serviceObj.type}
                            onChange={handleChange}
                            placeholder="Enter service type"
                            required

                        />
                        <textarea
                            id="description-input"
                            name="description"
                            value={serviceObj.description}
                            onChange={handleChange}
                            placeholder="Enter service description">
                        </textarea>


                        {msg !== null ? <h4 id="form-msg">{msg}</h4> : <></>}
                        <button type="submit" className="form-submit">{serviceId === null ? "Add Service" : "Update service"}</button>
                    </form>
                </div>
            </div>
        </>
    )
}


EditServiceForm.propTypes = {
    serviceID: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf([null]),
    ]),
    setServiceForm: PropTypes.func
};
