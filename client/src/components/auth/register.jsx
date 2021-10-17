import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

const Register = (props) => {
    const history = useHistory();

    const [user, setUser] = useState({
        name: "", email: "", password: ""
    });

    const host = "http://localhost:5000";

    const Signup = async (event) => {
        event.preventDefault();

        const { name, email, password } = user;

        const res = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, password
            })
        });

        const json = await res.json();
        // if (res.status === 422 || !data) {
        //     res.status(401).send("User not Found");
        // }
        // else {
        //     window.alert("Registertion Successfull!!")
        //     history.push("/login");
        // }

        if (json.success) {
            props.showAlert("Registertion Successfull!!", "success")
            history.push("/");
        }
        else {
            window.alert("Invalid Credentials!!")
        }

    }

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }


    return (
        <div>
            <form onSubmit={Signup}>
                <div className="login_page grid">
                    <div className="register login container grid">
                        <div className="login_header">
                            <h2>
                                Register
                            </h2>
                        </div>
                        <div className="username">
                            <h3>
                                Name
                            </h3>
                            <input className="userinput" type="text" name="name" placeholder="Enter your name" value={user.name}
                                onChange={handleInput} required/>
                        </div>
                        <div className="useremail">
                            <h3>
                                Email
                            </h3>
                            <input className="userinput" type="email" name="email" placeholder="Enter your email" value={user.email}
                                onChange={handleInput} required/>
                        </div>
                        <div className="password">
                            <h3>
                                Password
                            </h3>
                            <input className="passinput" type="password" name="password" placeholder="***************" value={user.password}
                                onChange={handleInput} minLength={5} required/>
                        </div>
                        <div className="login_btn">
                            <button>Register</button>
                            <Link to="/login" className="forgot">Already have account?</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;