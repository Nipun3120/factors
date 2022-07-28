import { Alert } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImageToDB } from "../api/image";
export const UploadImage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [helperText, setHelperText] = useState({
    isTrue: false,
    message: "",
    error: false,
  });
  useEffect(() => {
    const uid = localStorage.getItem("uid");

    if (uid !== "62e293b6f198d3149a27e5f4") {
      navigate("/page-not-found");
    }
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    const uid = localStorage.getItem("uid");
    if (image) {
      let formData = new FormData();
      formData.append("uid", uid);
      formData.append("userImage", image);

      const result = await uploadImageToDB(formData);
      if (result.data.ok) {
        setHelperText({
          isTrue: true,
          message: "Image Uploaded",
          error: false,
        });
      } else {
        setHelperText({
          isTrue: true,
          message: "Image Not uploaded, try again",
          error: true,
        });
      }
    } else {
      setHelperText({
        isTrue: true,
        message: "please select an image first",
        error: true,
      });
    }
  };

  const imageUpload = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };

  return (
    <div className="mt-12">
      <div className="p-10 bg-slate-300 max-w-sm m-auto">
        {helperText.isTrue && (
          <Alert
            className="mb-6"
            severity={helperText.error ? "error" : "success"}
          >
            {helperText.message}
          </Alert>
        )}
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
        <button
          className="bg-slate-600 px-16 py-1 text-white mb-6 mt-5"
          type="submit"
          onClick={submitHandler}
        >
          Upload image
        </button>
      </div>
    </div>
  );
};
