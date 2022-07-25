import { Link, useLocation } from "react-router-dom";
import { logoutHandler } from "../api/logoutHandler";

export const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const uid = localStorage.getItem("uid");
  return (
    <div className="bg-sky-500 flex justify-between items-center px-48 py-8">
      <div>logo</div>
      <div className="flex space-x-4">
        <Link
          to="/"
          className={
            pathname === "/"
              ? `underline decoration-white underline-offset-8`
              : ""
          }
        >
          Home
        </Link>
        <Link
          to="/about"
          className={
            pathname === "/about"
              ? `underline decoration-white underline-offset-8`
              : ""
          }
        >
          About Us
        </Link>
        <Link
          to="/clothing"
          className={
            pathname === "/clothing"
              ? `underline decoration-white underline-offset-8`
              : ""
          }
        >
          Clothing
        </Link>
        {!uid ? (
          <Link
            to="/signin"
            className={
              pathname === "/signin"
                ? `underline decoration-white underline-offset-8`
                : ""
            }
          >
            Sign In
          </Link>
        ) : (
          <div className="cursor-pointer" onClick={logoutHandler}>
            Sign Out
          </div>
        )}
      </div>
    </div>
  );
};
