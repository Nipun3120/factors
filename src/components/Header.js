import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logoutHandler } from "../api/logoutHandler";

export const Header = () => {
  const [isAdmin, setIsadmin] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    if (uid === "62e293b6f198d3149a27e5f4") setIsadmin(true);
  }, []);

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
          <>
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
            <Link
              to="/profile"
              className={
                pathname === "/profile"
                  ? `underline decoration-white underline-offset-8`
                  : ""
              }
            >
              Edit Profile
            </Link>
            {isAdmin && (
              <Link
                to="/uploadClothImage"
                className={
                  pathname === "/profile"
                    ? `underline decoration-white underline-offset-8`
                    : ""
                }
              >
                Upload Image
              </Link>
            )}
            <div className="cursor-pointer" onClick={logoutHandler}>
              Sign Out
            </div>
          </>
        )}
      </div>
    </div>
  );
};
