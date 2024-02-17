// import PropTypes from 'prop-types';
// import React from "react"
import product from "./productData.json"
import "./css/product.css"


export default function Products() {

    // const [ service, setServices ] = React.useState()


    let productList = product.items.map(ele => (
        <div key={ele.id} className="product-container">
            
            <div className="product-info">
                <img src="#" alt="" className="product-img"/>
                <h3 className="product-title">{ele.title}</h3>
                <p className="product-description">{ele.description}</p>
            </div>
            <div className="product-price">
                <button className="product-btn">
                    <span>${ele.price}</span>
                </button>
            </div>
            <button className="product-contactBtn">Contact</button>

        </div>
    ))

    return (
        <>
            <div className="product-list-container">
                {productList}

            </div>
        </>
    )
}


// Tittlepage.propTypes = {
//     titleData: PropTypes.array.isRequired,
//     setData: PropTypes.func.isRequired,
// };