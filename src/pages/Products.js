import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { getImage } from "../api/image";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";

const products = [
  {
    id: 1,
    imageId:
      "https://asset1.cxnmarksandspencer.com/is/image/mands/SD_02_T37_3396T_VJ_X_EC_2?$PDP_INT_IMAGE_DESKTOP_DOUBLE$",
  },
  {
    id: 2,
    imageId:
      "https://cdn.shopify.com/s/files/1/0398/7780/4188/products/27091151_43_600x.jpg?v=1646550773",
  },
  {
    id: 3,
    imageId:
      "https://johnlewis.scene7.com/is/image/JohnLewis/005619867?$rsp-pdp-port-640$",
  },
  {
    id: 4,
    imageId:
      "https://i.pinimg.com/736x/bf/e1/9a/bfe19a78858b503980f6d5b405b7f755.jpg",
  },
  {
    id: 5,
    imageId:
      "https://johnlewis.scene7.com/is/image/JohnLewis/005619867?$rsp-pdp-port-640$",
  },
  {
    id: 6,
    imageId:
      "https://i.pinimg.com/736x/bf/e1/9a/bfe19a78858b503980f6d5b405b7f755.jpg",
  },
  {
    id: 7,
    imageId:
      "https://asset1.cxnmarksandspencer.com/is/image/mands/SD_02_T37_3396T_VJ_X_EC_2?$PDP_INT_IMAGE_DESKTOP_DOUBLE$",
  },
  {
    id: 8,
    imageId:
      "https://cdn.shopify.com/s/files/1/0398/7780/4188/products/27091151_43_600x.jpg?v=1646550773",
  },
  {
    id: 9,
    imageId:
      "https://johnlewis.scene7.com/is/image/JohnLewis/005619867?$rsp-pdp-port-640$",
  },
  {
    id: 10,
    imageId:
      "https://i.pinimg.com/736x/bf/e1/9a/bfe19a78858b503980f6d5b405b7f755.jpg",
  },
  {
    id: 11,
    imageId:
      "https://johnlewis.scene7.com/is/image/JohnLewis/005619867?$rsp-pdp-port-640$",
  },
  {
    id: 12,
    imageId:
      "https://i.pinimg.com/736x/bf/e1/9a/bfe19a78858b503980f6d5b405b7f755.jpg",
  },
];
export const Products = () => {
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

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [base64Image, setBase64Image] = useState(null);
  const [helperText, setHelperText] = useState({ isTrue: false, message: "" });

  const handleOpen = async (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    const productId = e.target.id;
    setHelperText({ isTrue: false, message: "" });
    setOpen(true);
    getImage(uid).then(({ isError, errorMessage, image, imageUrl }) => {
      if (isError) {
        setLoading(false);
        setOpen(false);
        setHelperText({ isTrue: true, message: errorMessage });
      } else {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(image.data.data))
        );
        setBase64Image(`data:image/png;base64,${base64String}`);
        setLoading(false);
      }
    });
  };
  const handleClose = () => setOpen(false);

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
      <div className="grid grid-cols-3 gap-x-48 w-9/12 m-auto gap-y-16 my-10">
        {products.map((product, index) => {
          return (
            <div key={product.id} className="flex flex-col">
              <img
                src={product.imageId}
                alt="women top"
                className="h-80 w-60"
              />
              <button
                onClick={handleOpen}
                id={product.id}
                className="bg-gray-300 mt-3 py-1"
              >
                Try it on
              </button>
            </div>
          );
        })}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loading ? (
          <Box sx={style}>
            <LinearProgress color="success" className="sticky mb-4" />
            photo with cloth will appear here
          </Box>
        ) : (
          <Card
            sx={{ maxWidth: 345, marginTop: "100px" }}
            className="sticky mx-auto mt-auto p-3"
          >
            <CardMedia component="img" height="140" image={base64Image} />
            <div className="mt-3 cursor-pointer" onClick={() => setOpen(false)}>
              Close
            </div>
          </Card>
        )}
      </Modal>
    </div>
  );
};
