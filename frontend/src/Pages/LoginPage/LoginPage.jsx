import React from "react";
import './LoginPage.css'

import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    let navigate = useNavigate()

    const [loginData, setLoginData] = React.useState({
        email: "",
        password: ""
    });

    const [invalidLogin, setInvalidLogin] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState("")
    const [bearer, setBearer] = React.useState("")



    async function handleSubmit(event) {
        event.preventDefault();
    
        fetch("http://localhost:5036/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("Invalid credentials");
        })
        .then(data => {
            localStorage.setItem("Bearer", data.accessToken);
            setBearer(data.accessToken);

            navigate("/dashboard");
        })
        .catch(error => {
            console.error("Login error:", error);
            setErrorMsg("Invalid email or password");
            setInvalidLogin(true);
        });
    }
    

    function handleChange(event) {
        const { name, value } = event.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        setInvalidLogin(false)
    }

    return (
        <div className="login-container">

            <form className="login-form" onSubmit={handleSubmit}>
                <i className="nf nf-fa-lock"></i>
                <h3>sign in</h3>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                    className="email-input"
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
                {invalidLogin &&
                    <div className="errorMsg" style={{ "color": "red" }}>{errorMsg}</div>
                }
                <button type="submit" className="submit-btn">Login</button>
            </form>
        </div>
    );
}