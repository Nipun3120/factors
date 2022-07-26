import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export const SignIn = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [helperText, setHelperText] = useState({ isTrue: false, message: "" });

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      navigate("/clothing", { replace: true });
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { isTrue, message } = await login({ email, password });
    setHelperText({ isTrue, message });
  };

  return (
    <div className="">
      <div className="bg-cyan-400 w-5/12 m-auto py-10">
        {helperText.isTrue && (
          <Alert className="mb-6" severity="error">
            {helperText.message}
          </Alert>
        )}
        <input
          className="mb-6 p-1"
          placeholder="E-mail ID"
          value={email}
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="mb-6 p-1"
          placeholder="Password"
          value={password}
          name="email"
          type="password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <br />
        <button
          className="bg-slate-600 px-16 py-1 text-white mb-6"
          onClick={submitHandler}
        >
          Sign In
        </button>
        <br />
        <Link to="/signup" className="bg-slate-600 px-6 py-1 text-white mb-6">
          Not signed in yet? Sign Up
        </Link>
      </div>
    </div>
  );
};
