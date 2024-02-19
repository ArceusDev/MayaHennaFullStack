import React from "react"
import PropTypes from 'prop-types';
// import product from "./productData.json"
import "./Products.css"

// temp import
import img from "/mockImg.jpeg"

export default function Products(props) {

    const [ product, setProduct ] = React.useState(null)

    React.useEffect(()=>{
        async function fetchProducts(){
            try {
                    const response = await fetch("https://localhost:7086/api/Product",{
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const data = await response.json();
                    setProduct(data)
                }
            catch (error) {
                console.error("Error fetching services:", error);
            }
        }

        fetchProducts()

    },[])

    console.log(product);


    let productList = []
    let productFetchLimit = 0


    if (product !== null && product.length !== 0) {

        props.productExpand === true ? productFetchLimit = product.length : productFetchLimit = 5
        console.log(productFetchLimit);

        productList = product.slice(0, productFetchLimit).map(ele => (
            <div key={ele.id} className="product-container">

                <div className="product-info">

                    <img src={img} alt="product-img" className="product-img" />
                    <h3 className="product-title">{ele.title}</h3>
                    <p className="product-description">{ele.description}</p>
                </div>

                <div className="product-price-container">
                    <button className="product-pricebtn">
                        <span>${ele.price}</span>
                    </button>

                    <button className="product-contactBtn">Contact</button>
                </div>

            </div>
        ))

    } else {
        productList = <h2>loading...</h2>
    }

    return (
        <>
            <div className="product-list-container">
                {productList}

            </div>
        </>
    )
}


Products.propTypes = {
    productExpand: PropTypes.bool
};