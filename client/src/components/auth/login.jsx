import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { UserContext } from '../App';

const Login = (props) => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

    const [credentials, setCredentials] = useState({email: '', password: ''});

    const loginUser = async (event) => {
        event.preventDefault();

        const host = "http://localhost:5000";

        const res = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ODY5MTA1MDVjZWY0NDNkYmE3ZWRiIn0sImlhdCI6MTYzMjMwNDAwOH0.d7ZcjAXoFk37r6c0fj5T8_qJoYRtraPcR9xuGQUSctg'
            },
            body: JSON.stringify({
                email: credentials.email, password: credentials.password
            })
        });

        const json = await res.json();
        console.log(json);
        if (json.success) {
            props.showAlert("Login Successfull", "success")
            localStorage.setItem('token', json.authtoken);
            history.push("/");
        }
        else {
            props.showAlert("Invaild Credentials", "error")
        }

    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form onSubmit={loginUser}>
                <div className="login_page grid">
                    <div className="login container grid">
                        <div className="login_header">
                            <h2>
                                Login
                            </h2>
                        </div>
                        <div className="useremail">
                            <h3>
                                Email
                            </h3>
                            <input className="userinput" value={credentials.email} name="email" type="email" placeholder="Enter your email"
                                onChange={onChange}
                            />
                        </div>
                        <div className="password">
                            <h3>
                                Password
                            </h3>
                            <input className="passinput" value={credentials.password} type="password" name="password" placeholder="***************"
                                onChange={onChange}
                            />
                        </div>
                        <div className="login_btn">
                            <button type="submit">Log In</button>
                            <Link to="/register" className="forgot">Dont have account?</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;