import { useState } from "react"
import { Link } from "react-router-dom" 
export const SignIn = () => {
    const initialDetails = {
        email: "",
        password: "",
    }
    const [ signInDetails, setSignInDetails ] = useState(initialDetails);
    
    const changeDetails = (value, type) => {
        setSignInDetails( {...signInDetails, [type] : value})
    }
    return(
        <div  className="flex items-center justify-center h-full w-full">
            <div className="bg-cyan-400 w-5/12 m-auto py-10">
            
                <input className="mb-6 p-1" placeholder="E-mail ID" onChange={e => changeDetails(e.target.value, "email")}></input><br/>
                <input className="mb-6 p-1" placeholder="Password" onChange={e => changeDetails(e.target.value, "password")} type="password"></input><br/>
                <button className="bg-slate-600 px-16 py-1 text-white mb-6">Sign In</button><br/>
                <Link to="/signup" className="bg-slate-600 px-6 py-1 text-white mb-6">Not signed in yet? Sign Up</Link>
            </div>
        </div>
    )
}