
import React from "react"
import ProductsCatalog from "../../Components/Catalogs/ProductsCatalog"
import ServicesCatalog from "../../Components/Catalogs/ServicesCatalog"

import EditServiceForm from "../../Components/Forms/EditServiceForm"

import EditProductForm from "../../Components/Forms/EditProductForm"
import "./Dashboard.css"

export default function Dashboard() {
    const [catalogOptions, setCatalogOptions] = React.useState("services")
    const [createService, setCreateService] = React.useState(false)
    const [createProduct, setCreateProduct] = React.useState(false)
    const [create, setCreate] = React.useState("")

    const [searchInput, setSearchInput] = React.useState("")

    function setCatalog(option) {
        setCatalogOptions(option)
    }

    function handleSearchFormOnChange(event) {
        const { value } = event.target
        setSearchInput(value)
    }

    // function settingNavBtn() {
    //     if (catalogOptions === "services") {
    //         setCreate("services")
    //     } else if (catalogOptions === "products") {
    //         setCatalog("products")
    //     }
    // }



    return (



        <>
            <div className="dashboard-nav">


                <div className="dashboard-nav-btn">

                    <select className="dashboard-option" required onChange={(event) => setCatalog(event.target.value)} value={catalogOptions}>
                        <option value="services" >services</option>
                        <option value="products">products</option>
                    </select>
                    {
                        catalogOptions === "services"? <button className="dashboard-option" onClick={() => { setCreateService(true) }}>Create Service</button>
                        :catalogOptions === "products"?<button className="dashboard-option" onClick={() => { setCreateProduct(true) }}>Create product</button> : null

                    }
                    {/* <button className="dashboard-option" onClick={() => { settingNavBtn() }}>{createService == "services" ? "create service" : "create product"}</button> */}
                </div>

                <form className="search-form">
                    <input
                        type="text"
                        placeholder="search service by title"
                        name="searchInput"
                        value={searchInput}
                        onChange={handleSearchFormOnChange}
                    />
                </form>

            </div>


            {catalogOptions === "services" ? (
                <>
                    <ServicesCatalog searchInput={searchInput} />
                    {createService ?
                        <EditServiceForm
                            serviceID={null}
                            setServiceForm={setCreateService}
                        />
                        : null}
                </>
            ) : (
                <ProductsCatalog searchInput={searchInput} />
            )}
            {createProduct ?
                <EditProductForm 
                    productID={null}
                    setProductForm={setCreateProduct}

                /> : null}


        </>
    )
}


//todo set dash board for product catalogue call
//set warning function to work for product deleting 
//testing everything and refactor