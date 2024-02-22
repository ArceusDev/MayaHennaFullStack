import React from "react"
import  axios  from 'axios';
import PropTypes from 'prop-types';

// import "./EditServiceForm.css"



export default function EditProductForm(props) {
    const productId = props.productID;

    const [msg, setMsg] = React.useState(null)

    const [productObj, setProductObj] = React.useState(
        {
            title: "",
            description: "",
            price: "",
            picturelink: "",
        }
    )
    const[image, setImage] = React.useState(null)



    function getProductData() {

        fetch(`http://localhost:5036/api/Product/${productId}`)
            .then((response) => response.json())
            .then(data => {
                setProductObj(prevPost => ({
                    ...prevPost,
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    picturelink: data.picturelink,
                }));
            });
    }
    React.useEffect(() => {
        if (productId !== null) {

            getProductData()

        } else setProductObj(
            {
                title: "",
                description: "",
                price: "",
                picturelink: "https://res.cloudinary.com/don6c7ggw/image/upload/v1708369497/ae9geent75nppwk62f8y.png"
            }
        )
        setMsg(null)

    }, [productId])


    // async function uploadImagetoColud(){
    //     try {
    //         let data = new FormData();
    //         data.append('file',image);
    //         data.append('upload_preset',"fs0w72qj");
    //         data.append('cloud_name',"don6c7ggw");
    
    //         const response = await fetch("https://api.cloudinary.com/v1_1/don6c7ggw/image/upload",{
    //             method:"POST",
    //             body: data
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Failed to upload image');
    //         }
    
    //         const imageData = await response.json();
    //         const imageUrl = imageData.url;
    //         setProductObj(prevProduct => ({
    //             ...prevProduct,
    //             picturelink: imageUrl 
    //         }));
    //         console.log("Image URL:", imageUrl);
    //     }
    // }
    

    function handleSubmit(event) {
        event.preventDefault()

        // uploadImagetoColud()
        // console.log(JSON.stringify(productObj));

        if (productId !== null) {  //update service

            fetch(`http://localhost:5036/api/Product/${productId}`, {
                method: "PUT",
                body: JSON.stringify(productObj),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('Bearer')}`
                }
            })
            .then(res => {
                if (res.ok) { 
                    return res.json()
                } else {
                    throw new Error("Failed to update product")
                }
            })
            .then(data => {
                setMsg("product details updated")
            })
            .catch(error => {
                console.error("Error updating product:", error)
                setMsg("Some error occurred updating product")
            })

            


        } else {      //add new service in this case


            fetch(`http://localhost:5036/api/Product`, {
                method: "POST",
                body: JSON.stringify(productObj),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('Bearer')}`
                }
            })
            .then(res => {
                if (res.ok) { 
                    return res.json()
                } else {
                    throw new Error("Failed to add product")
                }
            })
            .then(data => {
                setMsg("New product added")
            })
            .catch(error => {
                console.error("Error adding product:", error)
                setMsg("Some error occurred adding new product")
            })


        }

    }

    function handleChange(event) {
        const { name, value } = event.target;
    
        // if (name === "image") {
        //     setImage(event.target.files[0]); 
        //     return;
        // }
    
        setProductObj((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
        setMsg(null);
    }
    

    function closeForm() {
        props.setProductForm(false)
    }


    return (
        <>
            <div className="overlay-div">

                <div className="form-div">

                    <button className="close-form" onClick={() => { closeForm() }}> X </button>

                    <form className="form" onSubmit={handleSubmit}>
                        {productId === null ? <h3>Create new product</h3> : <h3>{`update product # ${productId}`}</h3>}

                        <input
                            id="title-input"
                            type="text"
                            name="title"
                            value={productObj.title}
                            onChange={handleChange}
                            placeholder="Enter product title"
                            required

                        />

                        <input
                            id="price-input"
                            type="number"
                            name="price"
                            value={productObj.price}
                            onChange={handleChange}
                            placeholder="Enter price for product"
                            required

                        />
                        {/* <input
                            id="type-input"
                            type="file"
                            accept="image/*"
                            name="image"
                            // value={productObj.picturelink}
                            onChange={(e) => {setImage(event.target.files[0])}}
                            required

                        /> */}
                        <textarea
                            id="description-input"
                            name="description"
                            value={productObj.description}
                            onChange={handleChange}
                            placeholder="Enter product description">
                        </textarea>


                        {msg !== null ? <h4 id="form-msg">{msg}</h4> : <></>}
                        <button type="submit" className="form-submit">{productId === null ? "Add product" : "Update product"}</button>
                    </form>
                </div>
            </div>
        </>
    )
}


EditProductForm.propTypes = {
    productId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf([null]),
    ]),
    setProductForm: PropTypes.func
};
