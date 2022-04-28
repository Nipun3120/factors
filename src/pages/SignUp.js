export const SignUp = () => {
    return(
        <div>
            <div className="bg-cyan-400 w-5/12 m-auto py-10 flex flex-col items-start pl-48">
            
                <input className="mb-6 p-1" placeholder="Name"></input><br/>
                <input className="mb-6 p-1" placeholder="E-mail ID"></input><br/>
                <input className="mb-6 p-1" placeholder="Enter Password"></input><br/>
                <input className="mb-6 p-1" placeholder="Confirm Password"></input><br/>
                <input className="mb-6 p-1" placeholder="Upload Photo" type="file" id="img" name="img" accept="image/*"></input><br/>
                <button className="bg-slate-600 px-16 py-1 text-white mb-6" >Sign In</button><br/>
            </div>
        </div>
    )
}