import React, { useRef } from "react";
import "./Style.css";
import YoutubeEmbed from "../components/YoutubeEmbed";
import images from "../assets/instagram_gallery/index"
import IG_background from "../assets/Ingrain_Background.jpg";
import Bio_Pic from "../assets/Bio_Pic.jpg";

const About = () => {
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
    <div>
      {/* Brief Info */}
      <div className="relative flex justify-center items-center bg-neutral-950 min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${IG_background})`,
            opacity: 0.2,
          }}
        ></div>

        <div className="relative z-1 text-left flex flex-col justify-center h-full w-full p-16 mt-24">
          <article className="prose lg:prose-2xl aesthet_nova text-white text-left">
            <h1 className="aesthet-nova-h1 text-white">The art of crafting cool food</h1>
            <p className="aesthet-nova-h2 pt-6 text-3xl">
              InGrain. A Brand. A Team. With Passion. To make cool food. For Da
              Culture.
            </p>
            <p className="aesthet-nova-h2 text-2xl">
              At Ingrain, our central focus is to express passion through the
              art of crafting cool food that seamlessly fuses the rich tapestry
              of Asian Pacific Islander culture with a modern, innovative
              approach. We are dedicated to redefining culinary boundaries,
              celebrating heritage, and creating memorable experiences.
            </p>
          </article>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-evenly items-center m-6 md:m-24 bg-ingrain-board-color rounded-2xl drop-shadow-lg">
        <article className="prose lg:prose-2xl w-full md:w-1/4 mb-6 md:mb-0 pl-6 md:pl-0 pr-6 md:pr-0">
          <p className="aesthet-nova-h3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
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

      {/* Photo Gallery */}
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

      {/* Youtube */}
      <div className="flex flex-col justify-center items-center m-6 md:m-24">
        <div className="bg-ingrain-board-color rounded-lg shadow-xl w-full md:w-3/4 lg:w-2/3">
          <h1 className="text-4xl text-center font-bold p-8 aesthet-nova">
            <span className="text-black">Check Out Our Latest </span>
            <span className="text-ingrain-color-orange">YouTube Video!</span>
          </h1>

          <div className="flex justify-center items-end">
            <div className="size-full md:size-11/12 mb-8">
              <YoutubeEmbed embedId="bpOIp7EdRhg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;