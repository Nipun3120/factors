import { Link } from "react-router-dom";

export const Footer = () => {
    return(
        <div className="bg-cyan-700 py-24">
            <div className="flex justify-between items-center px-48 text-white">
                <div className="flex flex-col text-left">
                    <span>Creators</span>
                    <span>Gaurvi Rajwanshi 401903031</span>
                    <span>Deepanshi Shrivastava 40190306</span>
                    <span>Tanmay Shreshth 401903018</span>
                    <span>Dhairya Mahajan 401903010</span>
                </div>
                <div className="flex flex-col text-left">
                    <Link to="/clothing">Clothing</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/signin">Sign In</Link>
                </div>
            </div>
            <div>
                Logo
            </div>
        </div>
    )
}