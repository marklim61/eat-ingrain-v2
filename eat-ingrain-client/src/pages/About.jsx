import React from "react";
import "./Style.css";
import YoutubeEmbed from "../components/YoutubeEmbed";
import IG_background from "../assets/Ingrain_Background.jpg";
import BackgroundBanner from "../components/BackgroundBanner";
import Navbar from "../components/Navbar";
import CoFounderComponent from "../components/CoFounderComp";
import PhotoGallery from "../components/PhotoGallery";
import Footer from "../components/Footer";

const About = () => {
  const title = "The art of crafting cool food";
  const slogan =
    "Ingrain. A Brand. A Team. With Passion. To make cool food. For Da Culture.";
  const about = `
    At Ingrain, our central focus is to express passion through the
    art of crafting cool food that seamlessly fuses the rich tapestry
    of Asian Pacific Islander culture with a modern, innovative
    approach. We are dedicated to redefining culinary boundaries,
    celebrating heritage, and creating memorable experiences.
  `;

  return (
    <div>
      {/* Brief Info */}
      <div id="container1" className="relative">
        <Navbar />
        <BackgroundBanner bgImage={IG_background} />
        <div className="relative z-1 text-left flex flex-col min-h-screen h-full w-4/5 mx-auto p-12 pt-[200px]">
          <article className="prose lg:prose-2xl aesthet_nova text-white text-left">
            <h1 className="aesthet-nova-h1 text-white">{title}</h1>
            <p className="aesthet-nova-h2 pt-6 text-3xl">{slogan}</p>
            <p className="aesthet-nova-h2 text-2xl">{about}</p>
          </article>
        </div>
      </div>
      <CoFounderComponent />
      <PhotoGallery />
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
      <Footer />
    </div>
  );
};

export default About;
