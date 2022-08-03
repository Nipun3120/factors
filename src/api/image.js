import { BACKEND_URL } from "../constants";
import axios from "axios";

export const getImage = async (uid) => {
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
        name: null,
      };
    });

  return {
    isError: false,
    errorMessage: "",
    image: result.data.image,
    imageUrl: result.data.imageUrl,
    name: result.data.name,
  };
};
export const getProduct = async (uid, productId) => {
  const config = {
    headers: { "content-type": "application/json" },
  };

  const result = await axios
    .post(`${BACKEND_URL}/images/getProduct/`, { uid, productId }, config)
    .catch((err) => {
      console.log(err);
      return {
        isError: true,
        errorMessage: "Try again please !!",
        image: null,
        imageUrl: null,
        name: null,
      };
    });

  return {
    isError: false,
    errorMessage: "",
    image: result.data.image,
    imageUrl: result.data.imageUrl,
    name: result.data.name,
  };
};

export const updateUserImage = async (formdata) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const result = await axios.post(
    `${BACKEND_URL}/users/userImageUpdate/`,
    formdata,
    config
  );

  if (result.data.ok) {
    return { image: result.data.image, imageurl: result.data.imageUrl };
  } else {
    return { image: null, imageurl: null };
  }
};

export const fetchProductImages = async (uid) => {
  const config = {
    headers: { "content-type": "application/json" },
  };

  const result = await axios
    .post(`${BACKEND_URL}/images/fetchAllImages/`, { uid }, config)
    .catch((err) => {
      console.log(err);
      return {
        isError: true,
        errorMessage: "Try again please !!",
        productsArray: null,
      };
    });

  return {
    isError: false,
    errorMessage: "",
    productsArray: result.data.productsArray,
  };
};

export const uploadImageToDB = async (formdata) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  return axios
    .post(`${BACKEND_URL}/images/saveImage/`, formdata, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { ok: false };
    });
};

export const deleteProduct = async (productId) => {
  const config = {
    headers: { "content-type": "application/json" },
  };

  const result = await axios
    .post(`${BACKEND_URL}/images/deleteProduct/`, { productId }, config)
    .catch((err) => {
      console.log(err);
      return {
        isError: true,
        errorMessage: "Try again please !!",
      };
    });

  if (result.data.ok) {
    return {
      isError: false,
      errorMessage: "",
    };
  } else {
    return {
      isError: true,
      errorMessage: result.data.message,
    };
  }
};

export const deleteImage = async (uid) => {
  // deletes user image
  const config = {
    headers: { "content-type": "application/json" },
  };

  const result = await axios
    .post(`${BACKEND_URL}/users/deleteUserImage/`, { uid }, config)
    .catch((err) => {
      console.log(err);
      return {
        isError: true,
        errorMessage: "Try again please !!",
      };
    });
  if (result.data.ok) {
    return {
      message: "Image deleted",
      error: false,
    };
  } else {
    return {
      message: "try again !!",
      error: true,
    };
  }
};
