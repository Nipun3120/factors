import { Link } from "react-router-dom";

export const Footer = () => {
    return(
        <div className="bg-footer-blue pb-24 pt-16">
            <div className="flex justify-between items-center px-48 text-white">
                <div className="flex flex-col text-left">
                    <span className="font-bold text-xl mb-2">Creators: </span>
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
            <div className="flex justify-center mt-10">
                <img src='./assets/images/logo.png' alt="logo"/>
            </div>
        </div>
    )
}