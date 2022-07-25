import { BACKEND_URL } from "../constants";
import axios from "axios";

export const getImage = async ({ uid }) => {
  const config = {
    headers: { "content-type": "application/json" },
  };

  const result = await axios
    .post(`${BACKEND_URL}/images/fetchUserImage/`, { uid }, config)
    .catch((err) => {
      console.log(err);
      return {
        isError: true,
        errorMessage: "Try again please !!",
        image: null,
        imageUrl: null,
      };
    });

  return {
    isError: false,
    errorMessage: "",
    image: result.data.image,
    imageUrl: result.data.imageUrl,
  };
};
