import React from "react";
import {useUser} from "./UserProvider";

const Profile = () => {
    const {user} = useUser();

    return (
        <div>
            <h2>Profile</h2>
            {user ? (
                <p>Welcome, {user.name}!</p>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};


export default Profile