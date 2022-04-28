import { Link } from "react-router-dom" 
export const SignIn = () => {
    return(
        <div className="">
            <div className="bg-cyan-400 w-5/12 m-auto py-10">
            
                <input className="mb-6 p-1" placeholder="E-mail ID"></input><br/>
                <input className="mb-6 p-1" placeholder="Password"></input><br/>
                <button className="bg-slate-600 px-16 py-1 text-white mb-6">Sign In</button><br/>
                <Link to="/signup" className="bg-slate-600 px-6 py-1 text-white mb-6">Not signed in yet? Sign Up</Link>
            </div>
        </div>
    )
}