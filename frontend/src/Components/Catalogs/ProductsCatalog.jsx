import React from "react"

import EditProductForm from "../Forms/EditProductForm"
import PropTypes from 'prop-types';
// import Warning from "../models/Warning";
import DeleteWarning2 from "../models/DeleteWarning2"


export default function ProductsCatalog(props){

    const [products, setProducts] = React.useState(null)
    const [productForm, setProductForm] = React.useState(false)
    const [productId, setProductId] = React.useState(null)
    const [pageNum, setPageNum] = React.useState(1)
    const [deleteFormState, setDeleteFormState] = React.useState(false)
    const [deleteId, setDeleteId] = React.useState(null)
    // const[refreshTable, setReafreshTable] = React.useState(false)


    React.useEffect(() => {

        async function fetchProducts() {
            try {
                const response = await fetch(`http://localhost:5036/api/Product?PageNumber=${pageNum}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                setProducts(data)
            }
            catch (error) {
                console.error("Error fetching services:", error);
            }
        }

        async function searchProducts() {
            try {
                const response = await fetch(`http://localhost:5036/api/Product?Title=${props.searchInput}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                setProducts(data)
            }
            catch (error) {
                console.error("Error fetching services:", error);
            }
        }

        if (props.searchInput !== "") {
            searchProducts()
        } else {

            fetchProducts()
        }


    }, [props.searchInput, pageNum ,props.refreshTable])




    let productList = []
    if (products !== null) {
        productList = products.map(ele => {
            return (

                <tr key={ele.id}>
                    <td>{ele.id}</td>
                    <td className="description-cell">{ele.title}</td>
                    <td className="description-cell">{ele.description}</td>
                    <td>{ele.price}</td>
                    <td><a href={ele.picturelink} target="_blank"><img src={ele.picturelink} alt="productImage" className="product-img" /></a></td>
                    <td className="action-col">
                        <button className="edit-btn" onClick={() => { editProudct(ele.id) }}>edit product</button>
                        <button className="edit-btn" onClick={() => { deleteProduct(ele.id) }}>delete</button>
                    </td>
                </tr>
            )
        })
    } else {
        productList = <tr><td>Loading...</td></tr>
    }

    function editProudct(id) {
        console.log(id);
        setProductForm(true)
        setProductId(id)
    }

    function deleteProduct(id){
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
                        <th>Price</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {productList}
                </tbody>

            </table>
            <div className="page-btn">

                {
                    pageNum <= 1 ? <></> : <button onClick={() => { setPageNum(pageNum - 1) }}>{"<"}</button>
                }
                <button onClick={() => { setPageNum(pageNum + 1) }}>{">"}</button>
            </div>

            {productForm ? <EditProductForm
                productID={productId}
                setProductForm={setProductForm}
                setReafreshTable={props.setReafreshTable}
            />

                : <></>
            }

            {
                deleteFormState && deleteId !== null ? <DeleteWarning2 deleteId={deleteId} setDeleteFormState={setDeleteFormState} setReafreshTable={props.setReafreshTable}/> : <></>
            }

        </>

    )
}

ProductsCatalog.propTypes = {
    searchInput: PropTypes.string,
    refreshTable: PropTypes.bool,
    setReafreshTable: PropTypes.func,
};