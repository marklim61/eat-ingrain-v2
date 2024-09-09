import Bio_Pic from "../assets/Bio_Pic.jpg";

const CoFounderComponent = () => {
    const placeholder = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur.
    `

    return (
        <div className="flex flex-col-reverse md:flex-row justify-evenly items-center m-6 md:m-24 bg-ingrain-board-color rounded-2xl drop-shadow-lg">
            <article className="prose lg:prose-2xl w-full md:w-1/4 mb-6 md:mb-0 pl-6 md:pl-0 pr-6 md:pr-0">
            <p className="aesthet-nova-h3">{placeholder}</p>
            </article>
            <div className="flex flex-col items-center w-full md:w-1/3 mb-6 md:mb-6 m-4 md:m-8">
            <h3 className="text-center text-lg md:text-3xl font-semibold mb-2 md:mb-4 aesthet-nova-h1 text-ingrain-color-orange">
                COFOUNDERS
            </h3>
            <img
                src={Bio_Pic}
                alt="image_holder"
                className="w-3/4 md:w-full rounded-lg shadow-lg"
            />
            <figcaption className="text-center mt-4 text-gray-700 bg-ingrain-color-orange rounded-md p-2 shadow-md">
                <span className="font-semibold">Left:</span> Isaiah Tydinco <br />
                <span className="font-semibold">Right:</span> Tristan Jose
            </figcaption>
            </div>
        </div>
    )
}

export default CoFounderComponent;