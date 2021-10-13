import { React, useEffect, useState } from 'react'

const Profile = () => {

    const [user, setUser] = useState({});

    const getUser = async () => {
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        setUser(json);
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div>
            <div className="container">
                <h1>Welcome,</h1>
                <h1>{user.name}</h1>
            </div>

        </div>
    )
}

export default Profile
