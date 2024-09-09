import images from "../assets/instagram_gallery/index"
import React, { useRef } from "react";

const PhotoGallery = () => {
    const carouselRef = useRef(null);
    
    // JS function to scroll through the carousel
    const scrollCarousel = (direction) => {   
        // define the function and give it a direction parameter
        const scrollAmount = 300; // scrolling speed
        if (carouselRef.current) {
            if (direction === "left") {
            carouselRef.current.scrollBy({
                left: -scrollAmount,
                behavior: "smooth",
            }); // scrolls left by subtracting scrollAmount
            } else {
            carouselRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
            }
        }
        };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center mt-7 mb-6 md:mt-24 md:mb-24 lg:mt-35 lg:mb-35 px-4 md:px-5 lg:px-10 bg-ingrain-board-color">
            <div>
                <p className="aesthet-nova mb-4 mt-6 text-5xl">Instagram</p>
                <p className="aesthet-nova text-ingrain-color-orange mb-4">
                    Photo Gallery
                </p>
                <p className="aesthet-nova-h2 text-xl">
                    Bringing the flavors of the islands to your neighborhood popup 🏝️
                    #IslandBites
                </p>
                <a
                href="https://www.instagram.com/eat.ingrain"
                target="_blank"
                rel="noopener noreferrer"
                >
                    <button className="btn btn-xl sm:btn-lg md:btn-md lg:btn-lg bg-ingrain-color-orange text-white aesthet-nova-h3 hover:bg-hover-button-color mt-6 sm:mt-8 hidden md:inline">
                    View More
                    </button>
                </a>
            </div>

            {/* Left Button */}
            <button
                onClick={() => scrollCarousel("left")}
                className="btn btn-circle bg-ingrain-color-orange text-white hover:bg-hover-button-color m-4 hidden md:inline"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
                >
                    <path fill="currentColor" d="m14 17l-5-5l5-5z" />
                </svg>
            </button>

            {/* Carousel */}
            <div
            ref={carouselRef}
            className="carousel carousel-center p-6 rounded-box w-full"
            >
                {Object.keys(images).map((imageName) => (
                    <div key={imageName} className="carousel-item relative">
                    <img
                    src={images[imageName]}
                    alt={`Carousel item ${imageName}`}
                    className="rounded-box max-w-xs"
                    />
                    <div className="icon-container">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        >
                            <path
                            fill="currentColor"
                            d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                            />
                        </svg>
                    </div>
                    </div>
                ))}
            </div>

            {/* Right Button */}
            <button
            onClick={() => scrollCarousel("right")}
            className="btn btn-circle bg-ingrain-color-orange text-white m-4 hover:bg-hover-button-color hidden md:inline"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
                >
                    <path fill="currentColor" d="M10 17V7l5 5z" />
                </svg>
            </button>
            <a
            href="https://www.instagram.com/eat.ingrain"
            target="_blank"
            rel="noopener noreferrer"
            className="block sm:hidden"
            >
            <button className="btn btn-xl sm:btn-lg md:btn-md lg:btn-lg bg-ingrain-color-orange text-white aesthet-nova-h2 hover:bg-hover-button-color mb-5">
                View More
            </button>
            </a>
        </div>
    )
}

export default PhotoGallery