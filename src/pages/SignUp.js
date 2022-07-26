import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import { signUp } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [helperText, setHelperText] = useState({ isTrue: false, message: "" });

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      navigate("/clothing", { replace: true });
    }
  }, []);

  const submitHandler = async (e) => {
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      userImage !== ""
    ) {
      e.preventDefault();
      if (password !== confirmPassword)
        setHelperText({ isTrue: true, message: "passwords does not match" });
      else {
        setHelperText({ isTrue: false, message: "" });

        let formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("userImage", userImage);

        const message = await signUp(formData);
        setHelperText(message);
      }
    } else {
      setHelperText({ isTrue: true, message: "Please fill all the fields" });
    }
  };

  const imageUpload = (event) => {
    const image = event.target.files[0];
    setUserImage(image);
  };

  return (
    <div>
      <div className="bg-cyan-400 w-5/12 m-auto py-10 m">
        {helperText.isTrue && (
          <Alert className="mb-6" severity="error">
            {helperText.message}
          </Alert>
        )}
        <form id="form">
          <input
            name="name"
            className="mb-6 p-1 w-72"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            defaultValue=""
            required
          />
          <br />
          <input
            name="email"
            className="mb-6 p-1 w-72"
            placeholder="E-mail ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            defaultValue=""
            required
          />
          <br />
          <input
            name="password"
            className="mb-6 p-1 w-72"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            defaultValue=""
            required
          />
          <br />
          <input
            name="confirmPassword"
            className="mb-6 p-1 w-72"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            defaultValue=""
            required
          />
          <br />
          <label
            className="block mb-2 p-1 w-72 text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="file_input"
          >
            Upload Image
          </label>
          <input
            className="mb-1 p-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            name="userImage"
            onChange={imageUpload}
          />
          <p
            className="mb-6 p-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            JPG, PNG (max 15mb).
          </p>

          <br />
          <button
            className="bg-slate-600 px-16 py-1 text-white mb-6 mt-5"
            type="submit"
            onClick={submitHandler}
          >
            Sign In
          </button>
        </form>
        <br />
      </div>
    </div>
  );
};
