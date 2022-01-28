import React from "react";
import {useNavigate} from 'react-router-dom'
import {useAuth0} from "@auth0/auth0-react";
////////////////////////////////////////////////////////////////////////////////////////////////////
function Login({page,pageName}) {
    const navigate = useNavigate()
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    if (isAuthenticated) {
        return (
            <div className="Login">
                <p className="text-gray-400 text-xs cursor-pointer"> { user.email } </p>
                <p className="loginBox bg-gray-200 mt-1 w-1/6 text-gray-400 text-xs cursor-pointer" onClick={() => logout({ returnTo: window.location.origin })}> {"Sign Out"} </p>
                <p className="loginBox bg-gray-500 mt-1 w-1/6 text-gray-300 text-xs cursor-pointer" onClick={() => navigate("/"+page)}> { pageName } </p>
            </div>
        );        
    }
    return (
        <div className="Login">
            <p className="bg-gray-200 w-1/6 mx-auto text-gray-400 text-xs cursor-pointer" onClick={() => loginWithRedirect()}> {"Sign In"} </p>
        </div>
    );
}
export default Login;
