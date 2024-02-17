import React from "react";
import './css/login.css'

export default function Login(){
    const [loginData, setLoginData] = React.useState({
        username: "",
        password: ""
    });

    function handleSubmit(event) {
        event.preventDefault();


        fetch("/api/loginEndpoint", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
        })


    }

    function handleChange(event) {
        const { name, value } = event.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div className="login-container">

        <form className="login-form" onSubmit={handleSubmit}>
            <i className="nf nf-fa-lock"></i>
            <h3>sign in</h3>
            <input
                id="username"
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
                className="username-input"
            />
            <input
                id="password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="password-input"
            />
            <button type="submit" className="submit-btn">Login</button>
        </form>
        </div>
    );
}