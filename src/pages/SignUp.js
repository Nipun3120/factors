import { useState } from "react";
export const SignUp = () => {
    const initialDetails = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        photo: null,
    }
    const [details, setDetails]  = useState(initialDetails);
    const [passwordConfirm, setPasswordConfirm] = useState(true);

    const updateDetails = ({type, newValue}) => {
        setDetails({...details, [type]: newValue})
    }   
    
    const submitForm = () => {
        if(details.password === details.confirmPassword){
            setPasswordConfirm(true);
            //submit
        }else{
            setPasswordConfirm(false);
        }
    }
    return(
        <div className="my-10">
            <div className="bg-cyan-400 w-4/12 m-auto py-10 flex flex-col items-center justify-center">
            
                <input className="mb-6 p-1" placeholder="Name" onChange={(e) => updateDetails({type: "name", newValue: e.target.value})}></input><br/>
                <input className="mb-6 p-1" placeholder="E-mail ID" onChange={(e) => updateDetails({type: "email", newValue: e.target.value})}></input><br/>
                <input className="mb-6 p-1" placeholder="Enter Password" onChange={(e) => updateDetails({type: "password", newValue: e.target.value})} type="password"></input><br/>
                <input className="p-1" placeholder="Confirm Password" onChange={(e) => updateDetails({type: "confirmPassword", newValue: e.target.value})} type="password"></input><br/>
                <span className={passwordConfirm ? 'hidden' : "block mb-6"}>Password not matching</span>
                <input className="mb-6 p-1 ml-36" placeholder="Upload Photo" type="file" id="img" name="img" accept="image/*" onChange={(e) => updateDetails({type: "photo", newValue: e.target.value[0]})}></input><br/>
                <button className="bg-slate-600 px-16 py-1 text-white mb-6" onClick={submitForm}>Sign In</button><br/>
            </div>
        </div>
    )
}