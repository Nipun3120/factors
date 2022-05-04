const products = [
    {
        id: 1,
        imageId: "https://asset1.cxnmarksandspencer.com/is/image/mands/SD_02_T37_3396T_VJ_X_EC_2?$PDP_INT_IMAGE_DESKTOP_DOUBLE$",
    },
    {
        id: 2,
        imageId: "https://cdn.shopify.com/s/files/1/0398/7780/4188/products/27091151_43_600x.jpg?v=1646550773",
    },
    {
        id: 3,
        imageId: "https://johnlewis.scene7.com/is/image/JohnLewis/005619867?$rsp-pdp-port-640$",
    },
];
export const Home = () => {
    return(
        <div className="text-left">

            {/* Section1 */}
            <div className="bg-header-blue py-10">
                <div className="w-5/12 m-auto">
                    <h1 className="font-bold py-5 text-3xl">Fine-grained Apparel category Classification & Try-On Recommender System </h1>
                    <span>The model which can superimpose the clothing images on the customers so they can see for themselves how the fit will look on their own bodies. </span>
                </div>            
            </div>



            {/* //section2 */}
            <div className="w-5/12 m-auto text-center py-10">
                <div className="flex space-x-1">
                    {
                        products.map(product => {
                            return(
                                <img key={product.id} src={product.imageId} alt="women tops" className="h-80 w-60"></img>
                            )
                        })
                    }
                </div>
                <h1 className="font-bold py-5 text-xl">How to use it</h1>
                <span>The model will superimpose the clothing you like from 
the clothing menu, and display on your image you upload.
You can upload the image by signing up. If you have signed up 
already, you’re all set!</span>
            </div>
        </div>
    )
}