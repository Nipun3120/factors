import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import {
  deleteProduct,
  fetchProductImages,
  getImage,
  getProduct,
} from "../api/image";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Navigate, useNavigate } from "react-router-dom";

// const products = [
//   {
//     id: 1,
//     imageId:
//       "https://asset1.cxnmarksandspencer.com/is/image/mands/SD_02_T37_3396T_VJ_X_EC_2?$PDP_INT_IMAGE_DESKTOP_DOUBLE$",
//   },
//   {
//     id: 2,
//     imageId:
//       "https://cdn.shopify.com/s/files/1/0398/7780/4188/products/27091151_43_600x.jpg?v=1646550773",
//   },
//   {
//     id: 3,
//     imageId:
//       "https://johnlewis.scene7.com/is/image/JohnLewis/005619867?$rsp-pdp-port-640$",
//   },
//   {
//     id: 4,
//     imageId:
//       "https://i.pinimg.com/736x/bf/e1/9a/bfe19a78858b503980f6d5b405b7f755.jpg",
//   },
//   {
//     id: 5,
//     imageId:
//       "https://johnlewis.scene7.com/is/image/JohnLewis/005619867?$rsp-pdp-port-640$",
//   },
//   {
//     id: 6,
//     imageId:
//       "https://i.pinimg.com/736x/bf/e1/9a/bfe19a78858b503980f6d5b405b7f755.jpg",
//   },
//   {
//     id: 7,
//     imageId:
//       "https://asset1.cxnmarksandspencer.com/is/image/mands/SD_02_T37_3396T_VJ_X_EC_2?$PDP_INT_IMAGE_DESKTOP_DOUBLE$",
//   },
//   {
//     id: 8,
//     imageId:
//       "https://cdn.shopify.com/s/files/1/0398/7780/4188/products/27091151_43_600x.jpg?v=1646550773",
//   },
//   {
//     id: 9,
//     imageId:
//       "https://johnlewis.scene7.com/is/image/JohnLewis/005619867?$rsp-pdp-port-640$",
//   },
//   {
//     id: 10,
//     imageId:
//       "https://i.pinimg.com/736x/bf/e1/9a/bfe19a78858b503980f6d5b405b7f755.jpg",
//   },
//   {
//     id: 11,
//     imageId:
//       "https://johnlewis.scene7.com/is/image/JohnLewis/005619867?$rsp-pdp-port-640$",
//   },
//   {
//     id: 12,
//     imageId:
//       "https://i.pinimg.com/736x/bf/e1/9a/bfe19a78858b503980f6d5b405b7f755.jpg",
//   },
// ];

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
};

export const Products = () => {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [helperText, setHelperText] = useState({ isTrue: false, message: "" });
  const [products, setProducts] = useState([]);
  const [productTrial, setProductTrial] = useState("");
  const [base64Image, setBase64Image] = useState(null);
  const [isAdmin, setAdmin] = useState(false);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      navigate("/signin", { replace: true });
    }

    if (uid === "62e9ed62b487f78cdde77923") setAdmin(true);
    const getProducts = async (uid) => {
      const { productsArray } = await fetchProductImages(uid);
      console.log(productsArray);
      setProducts(productsArray);
    };

    getProducts(uid);
  }, []);

  const handleOpen = async (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    const productId = e.target.id;

    setBase64Image(null);
    setLoading(true);

    setHelperText({ isTrue: false, message: "" });
    setOpen(true);
    getProduct(uid, productId).then(
      ({ isError, errorMessage, image, imageUrl }) => {
        if (isError) {
          setLoading(false);
          setOpen(false);
          setHelperText({ isTrue: true, message: errorMessage });
        } else {
          setBase64Image(image);
          setLoading(false);
        }
      }
    );
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async (event) => {
    event.preventDefault();
    setLoading(true);
    setHelperText({ isTrue: true, message: "Deleting..." });
    const productId = event.target.id;
    console.log(productId);
    console.log(products);
    const result = await deleteProduct(productId);
    if (result.isError) {
      setHelperText({ isTrue: true, message: result.errorMessage });
    } else {
      const productsArray = products.filter(
        (product) => product.id !== productId
      );
      setProducts(productsArray);
      setHelperText({ isTrue: false, message: "" });
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Section 1 */}
      <div className="bg-header-blue">
        {helperText.isTrue && (
          <Alert className="mb-6" severity="error">
            {helperText.message}
          </Alert>
        )}
        <div className="w-5/12 m-auto">
          <input placeholder="Search here" className="my-24 py-1 px-8"></input>
        </div>
      </div>

      {/* Section 2 */}
      {products.length ? (
        <div className="grid grid-cols-3 gap-x-48 w-9/12 m-auto gap-y-16 my-10">
          {products.map((product, index) => {
            return (
              <div key={product.id} className="flex flex-col">
                <img
                  src={product.imageLink}
                  alt="women top"
                  className="h-80 w-60"
                />
                <div className="flex flex-nowrap">
                  <button
                    onClick={handleOpen}
                    id={product.id}
                    className="bg-gray-300 mt-3 flex-1 mr-2"
                  >
                    Try it on
                  </button>

                  {isAdmin && (
                    <button
                      onClick={handleDelete}
                      id={product.id}
                      className="bg-gray-300 mt-3 flex-1 ml-2"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-1/2">
          <Typography center variant="h4">
            No Products Available
          </Typography>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loading ? (
          <Box sx={style}>
            <LinearProgress color="success" className="sticky mb-4" />
            your photo will be ready in a few seconds...
          </Box>
        ) : (
          <Card
            sx={{ maxWidth: 345, marginTop: "100px" }}
            className="sticky mx-auto mt-auto p-3"
          >
            <CardMedia component="img" height="340" image={base64Image} />
            <div className="mt-3 cursor-pointer" onClick={() => setOpen(false)}>
              Close
            </div>
          </Card>
        )}
      </Modal>
    </div>
  );
};
