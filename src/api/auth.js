import { BACKEND_URL } from "../constants";
import axios from "axios";

export const signUp = async (formdata) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  axios
    .post(`${BACKEND_URL}/users/signup/`, formdata, config)
    .then((response) => {
      if (response.data.ok) {
        window.location.replace("/signin");
      } else {
        return response.data.message;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const login = async ({ email, password }) => {
  const config = {
    headers: { "content-type": "application/json" },
  };
  axios
    .post(`${BACKEND_URL}/users/login/`, { email, password }, config)
    .then((result) => {
      if (result.data.ok) {
        localStorage.setItem("uid", result.data.uid);
        window.location.replace("/");
        return { isTrue: false };
      } else {
        return { isTrue: false, message: result.data.message };
      }
    })
    .catch((err) => {
      console.log(err);
      return "something went wrong, login again !!!";
    });
};
