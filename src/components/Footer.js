import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

export const Footer = () => {
  const uid = localStorage.getItem("uid");
  return (
    <div className="bg-footer-blue pb-24 pt-16">
      <div className="flex justify-between items-center px-48 text-white">
        <div className="flex flex-col text-left">
          <span className="font-bold text-xl mb-2">Creators: </span>
          <span>Gaurvi Rajwanshi 401903031</span>
          <span>Deepanshi Srivastava 401903006</span>
          <span>Tanmay Shresth 401903018</span>
          <span>Dhairya Mahajan 401903010</span>
        </div>
        <div className="flex justify-center mt-10">
          <img src={logo} alt="logo" />
        </div>
        <div className="flex flex-col text-left">
          {uid && <Link to="/clothing">Clothing</Link>}
          <Link to="/about">About Us</Link>
          {!uid && <Link to="/signin">Sign In</Link>}
        </div>
      </div>
    </div>
  );
};
