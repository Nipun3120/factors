import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteImage, getImage, updateUserImage } from "../api/image";
import LinearProgress from "@mui/material/LinearProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 100,
};

export const EditProfile = () => {
  const navigate = useNavigate();
  const [base64Image, setBase64Image] = useState(null);
  const [name, setName] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [showLoading, setLoading] = useState(false);
  const [s3Image, setImageUrl] = useState("");
  const [noImage, setNoImage] = useState({ isTrue: false, message: "" });

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      navigate("/signin", { replace: true });
    }

    getImage(localStorage.getItem("uid")).then(
      ({ isError, errorMessage, image, imageUrl, name }) => {
        setName(name);
        setImageUrl(imageUrl);
        if (image) {
          console.log(image);
          const uintArray = new Uint8Array(image.data.data);
          let resultString = "";
          for (var i = 0; i < uintArray.length; i++) {
            resultString += String.fromCharCode(uintArray[i]);
          }

          const base64String = btoa(resultString);

          setBase64Image(
            `data:${image.data.contentType};base64,${base64String}`
          );
        }
      }
    );
  }, []);

  const formDisplayHandler = (e) => {
    e.preventDefault();
    setDisplayForm(!displayForm);
  };

  const imageUpload = (event) => {
    const image = event.target.files[0];
    setBase64Image(null);
    setUserImage(image);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const uid = localStorage.getItem("uid");
    setLoading(true);
    let formData = new FormData();
    formData.append("uid", uid);
    formData.append("userImage", userImage);

    const resultImage = await updateUserImage(formData);
    setImageUrl(resultImage.imageurl);

    // const uintArray = new Uint8Array(resultImage.image.data.data);
    // console.log(uintArray);
    // let resultString = "";
    // for (var i = 0; i < uintArray.length; i++) {
    //   resultString += String.fromCharCode(uintArray[i]);
    // }
    // const base64String = btoa(resultString);

    // setBase64Image(
    //   `data:${resultImage.data.contentType};base64,${base64String}`
    // );

    setLoading(false);
    setDisplayForm(false);
    console.log(s3Image);
  };

  const deleteUserImage = (event) => {
    event.preventDefault();
    const uid = localStorage.getItem("uid");
    deleteImage(uid);
    setUserImage(null);
    setImageUrl(null);
  };

  return (
    <div className="p-10">
      <Card sx={{ maxWidth: 500 }} className="mx-auto">
        <Container>
          {showLoading ? (
            <Box sx={style}>
              <LinearProgress color="success" className="sticky mb-4" />
              your photo will be updated soon...
            </Box>
          ) : displayForm ? (
            <Box className="bg-blue-300 p-2 rounded-md">
              <input
                className="w-full mb-1 p-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                name="userImage"
                onChange={imageUpload}
              />
              <button
                className="w-1/3 mt-2 bg-slate-300 rounded-lg"
                onClick={submitHandler}
              >
                Submit
              </button>
            </Box>
          ) : s3Image ? (
            <CardMedia component="img" height="100" image={s3Image} />
          ) : (
            <Typography variant="h5" color="primary" className="p-5">
              No Image
            </Typography>
          )}
          <CardContent>
            {name.length ? (
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
            ) : null}
          </CardContent>
          <CardActions>
            <Button size="large" onClick={formDisplayHandler}>
              {s3Image ? (
                displayForm ? (
                  <p>Cancel</p>
                ) : (
                  <p>Update Image</p>
                )
              ) : (
                <p>Upload Image</p>
              )}
            </Button>
            {s3Image && (
              <Button
                size="large"
                disabled={s3Image ? false : true}
                onClick={deleteUserImage}
              >
                Delete Image
              </Button>
            )}
          </CardActions>
        </Container>
      </Card>
    </div>
  );
};
