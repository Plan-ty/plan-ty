import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Login.css";

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const login = async () => {
        setUsernameError('');
        setPasswordError('');

        if (username === '') {
            setUsernameError('Please enter your username');
            return;
        }

        if (password === '') {
            setPasswordError('Please enter a password');
            return;
        }

        if (password.length < 8) {
            setPasswordError('The password must be 8 characters or longer');
            return;
        }

        try {
            const response = await axios.post("http://localhost:5021/Users/login", {
                username,
                password
            });
            if (response.status === 200) {
                const token = response.headers.authorization?.split(" ")[1];
                console.log('Token:', token); // Debug log
                sessionStorage.setItem("jwt", token);
                setToken(token); // Set token in parent component
                console.log('Redirecting to home page...'); // Debug log
                navigate("/home", { replace: true }); // Redirect to home page
            } else {
                console.error('Login failed with status:', response.status);
                alert("Login failed!");
            }
        } catch (error) {
            console.error('Login error:', error); // Debug log
            alert("Login failed!");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            login();
        }
    };

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <div>Login</div>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    value={username}
                    placeholder="Enter your username here"
                    onChange={(ev) => setUsername(ev.target.value)}
                    onKeyDown={handleKeyDown}
                    className="inputBox"
                />
                <label className="errorLabel">{usernameError}</label>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    type="password"
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    onKeyDown={handleKeyDown}
                    className="inputBox"
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className="inputContainer">
                <input className="inputButton" type="button" onClick={login} value="Log in" />
            </div>
        </div>
    );
};

export default Login;
