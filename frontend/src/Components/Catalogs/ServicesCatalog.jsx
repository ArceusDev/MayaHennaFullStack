import React from "react"

import "./ServicesCatalog.css"
import EditServiceForm from "../Forms/EditServiceForm"
import Warning from "../models/Warning";

import PropTypes from 'prop-types';

export default function ServicesCatalog(props) {

    const [service, setServices] = React.useState(null)
    const [serviceForm, setServiceForm] = React.useState(false)
    const [serviceID, setServiceId] = React.useState(null)
    const [pageNum, setPageNum] = React.useState(1)
    const [deleteFormState, setDeleteFormState] = React.useState(false)
    const [deleteId, setDeleteId] = React.useState(null)
    const [sort, setSort] = React.useState(false)
    
    React.useEffect(()=>{
        async function sortDescending() {
            try {
                const response = await fetch(`http://localhost:5036/api/Service?SortBy=price&IsDecsending=${sort}&PageNumber=${pageNum}`, {
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

        sortDescending()
        
    },[sort])

    React.useEffect(() => {

        async function fetchServices() {
            try {
                const response = await fetch(`http://localhost:5036/api/Service?PageNumber=${pageNum}`, {
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

        async function searchServices() {
            try {
                const response = await fetch(`http://localhost:5036/api/Service?Title=${props.searchInput}`, {
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

        if (props.searchInput !== "") {
            searchServices()
        } else {

            fetchServices()
        }


    }, [props.searchInput, pageNum ,props.refreshTable])




    let serviceList = []
    if (service !== null) {
        serviceList = service.map(ele => {
            return (

                <tr key={ele.id}>
                    <td>{ele.id}</td>
                    <td className="description-cell">{ele.title}</td>
                    <td className="description-cell">{ele.description}</td>
                    <td>{ele.price}</td>
                    <td>{ele.type}</td>
                    <td className="action-col">
                        <button className="edit-btn" onClick={() => { editServices(ele.id) }}>edit</button>
                        <button className="edit-btn" onClick={() => { deleteServices(ele.id) }}>delete</button>
                    </td>
                </tr>
            )
        })
    } else {
        serviceList = <tr><td>Loading...</td></tr>
    }



    function editServices(id) {
        setServiceForm(true)
        setServiceId(id)
    }

    function deleteServices(id){
        setDeleteFormState(true)
        setDeleteId(id)
    }




    return (
        <>
            <table className="service-table">
                <thead>
                    <tr>

                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>
                            Price 
                            {
                                sort ? <i className="nf nf-md-sort_ascending sort-icon" onClick={()=> {setSort(false)}}></i>
                                     :  <i className="nf nf-md-sort_descending sort-icon" onClick={()=> {setSort(true)}}></i>
                            }
                            
                        </th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceList}
                </tbody>

            </table>
            <div className="page-btn">

                {
                    pageNum <= 1 ? <></> : <button onClick={() => { setPageNum(pageNum - 1) }}>{"<"}</button>
                }
                <button onClick={() => { setPageNum(pageNum + 1) }}>{">"}</button>
            </div>

            {serviceForm ? <EditServiceForm
                serviceID={serviceID}
                setServiceForm={setServiceForm}
                setReafreshTable={props.setReafreshTable}
            />

                : <></>
            }

            {
                deleteFormState && deleteId !== null ? <Warning deleteId={deleteId} setDeleteFormState={setDeleteFormState} setReafreshTable={props.setReafreshTable}/> : <></>
            }

        </>

    )
}

ServicesCatalog.propTypes = {
    searchInput: PropTypes.string,
    refreshTable: PropTypes.bool,
    setReafreshTable: PropTypes.func,
};