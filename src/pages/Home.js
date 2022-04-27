export const Home = () => {
    return(
        <div className="text-left">

            {/* Section1 */}
            <div className="bg-sky-500">
                <div className="w-5/12 m-auto">
                    <h1 className="font-bold py-5 text-xl">Fine-grained Apparel category Classification & Try-On Recommender System </h1>
                    <span>The model which can superimpose the clothing images on the customers so they can see for themselves how the fit will look on their own bodies. </span>
                </div>            
            </div>



            {/* //section2 */}
            <div className="w-5/12 m-auto">
                <h1 className="font-bold py-5 text-xl">How to use it</h1>
                <span>The model will superimpose the clothing you like from 
the clothing menu, and display on your image you upload.
You can upload the image by signing up. If you have signed up 
already, you’re all set!</span>
            </div>
        </div>
    )
}