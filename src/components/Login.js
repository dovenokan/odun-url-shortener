/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState,useEffect } from 'react';
import supabase from '../config/supaconfig'
import {useHistory} from 'react-router-dom'
////////////////////////////////////////////////////////////////////////////////////////////////////
function Login({page,pageName}) {
////////////////////////////////////////////////////////////////////////////////////////////////////
    const his = useHistory()
////////////////////////////////////////////////////////////////////////////////////////////////////
    const [perm, setPerm] = useState("0")
    const [localGmail, setLocalGmail] = useState("")
    const [user] = useAuthState(auth);
////////////////////////////////////////////////////////////////////////////////////////////////////
    function signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
////////////////////////////////////////////////////////////////////////////////////////////////////
    function signOut() {
        auth.signOut()
        localStorage.setItem("permission","0")
        localStorage.setItem("gmail","none")
        localStorage.setItem("uid","none")
        setPerm("0")
    }
////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (user!==null) {
            localStorage.setItem("gmail",user.email)
            localStorage.setItem("uid",user.uid)
            localStorage.setItem("permission","1")
            setLocalGmail(user.email||localStorage.getItem("gmail"))
            setPerm("1")
          }
    }, [user])
////////////////////////////////////////////////////////////////////////////////////////////////////
    if ( perm==="1" ) {
        return(
            <>
                <div className="Login">
                    <p className="text-gray-400 text-xs cursor-pointer"> { localGmail } </p>
                    <p className="loginBox bg-gray-200 mt-1 w-1/6 text-gray-400 text-xs cursor-pointer" onClick={() => signOut()}> {"Sign Out"} </p>
                    <p className="loginBox bg-gray-500 mt-1 w-1/6 text-gray-300 text-xs cursor-pointer" onClick={() => his.push("/"+page)}> { pageName } </p>
                </div>
            </>
        )
    }
    return(
        <>
            <div className="Login">
                <p className="bg-gray-200 w-1/6 mx-auto text-gray-400 text-xs cursor-pointer" onClick={() => signInWithGoogle()}> {"Sign In"} </p>
            </div>
        </>
    )
}
export default Login
