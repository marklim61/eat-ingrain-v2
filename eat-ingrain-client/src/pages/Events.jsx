import React, { useState, useEffect, useMemo } from "react";
import pure_project from "../assets/Ingrain_Background.jpg";
import night_parade from "../assets/instagram_gallery/firstpopup_v2.jpg";
import goalxbrewing from "../assets/instagram_gallery/secondpopup_v3.jpg";
import "./Style.css";
import event_bg from "../assets/instagram_gallery/event_BG.jpg";

const Events = () => {
  const eventDate = useMemo(() => new Date("2024-08-22T00:00:00"), []);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const distance = eventDate - now;
      console.log("Distance: ", distance); // Log the distance

      if (distance < 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        console.log(
          `Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`
        ); // Logging

        setTimeRemaining({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [eventDate]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="h-screen flex items-center justify-center">
          <div className="relative flex flex-col justify-center items-center bg-neutral-950 h-full w-full p-16">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${event_bg})`,
                opacity: 0.2,
              }}
            >
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mt-[calc(8rem+40px)] mb-4 text-white aesthet-nova text-center">
              JOIN US FOR OUR NEXT POPUP <br /> AT GOAL. BREWING
            </h1>
            <h4 className="text-white aesthet-nova-h2 mb-6 text-center text-xl">
              3052 El Cajon Blvd Suite 101, San Diego, CA 92104
            </h4>
            <p className="text-xl md:text-2xl mb-6 text-white aesthet-nova text-center">
              {eventDate.toDateString()} <br /> 2PM - SELLOUT
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white aesthet-nova text-center">
              Countdown to the event:
            </h2>
            <div className="grid grid-flow-col gap-2 md:gap-5 text-center auto-cols-max">
              <div className="flex flex-col p-2 bg-ingrain-color-orange rounded-box text-neutral-content">
                <span className="countdown font-mono text-4xl md:text-5xl">
                  {timeRemaining.days < 10
                    ? `00${timeRemaining.days}`.slice(-3)
                    : timeRemaining.days}
                </span>
                days
              </div>
              <div className="flex flex-col p-2 bg-ingrain-color-orange rounded-box text-neutral-content">
                <span className="countdown font-mono text-4xl md:text-5xl">
                  {timeRemaining.hours < 10
                    ? `00${timeRemaining.hours}`.slice(-2)
                    : timeRemaining.hours}
                </span>
                hours
              </div>
              <div className="flex flex-col p-2 bg-ingrain-color-orange rounded-box text-neutral-content">
                <span className="countdown font-mono text-4xl md:text-5xl">
                  {timeRemaining.minutes < 10
                    ? `00${timeRemaining.minutes}`.slice(-2)
                    : timeRemaining.minutes}
                </span>
                min
              </div>
              <div className="flex flex-col p-2 bg-ingrain-color-orange rounded-box text-neutral-content">
                <span className="countdown font-mono text-4xl md:text-5xl">
                  {timeRemaining.seconds < 10
                    ? `00${timeRemaining.seconds}`.slice(-2)
                    : timeRemaining.seconds}
                </span>
                sec
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 pl-3 md:p-12 mb-24 mt-24 rounded-xl max-w-screen md:max-w-7xl mx-auto md:drop-shadow-2xl drop-shadow-xl bg-ingrain-board-color">
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            <li>
              <div className="timeline-end hidden md:inline">
                <img
                  src={goalxbrewing}
                  alt="goalxbrewing"
                  className="timeline-image h-48 w-48 rounded-full object-cover ml-24"
                />
              </div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono italic">June 23 2024</time>
                <div className="text-3xl font-black aesthet-nova">
                  GOAL. Brewing
                </div>
                <div className="aesthet-nova-h3 md:text-2xl">
                  We are back for da summer and officially popping up at
                  @goalxbrewing on Sunday, June 23 from 2pm - sellout! Come by
                  for some solid beers and kick it with us on their outside
                  patio. Thank you all for your patience and continued support
                  🫶🏽🍚🍊
                </div>
                <div className="md:hidden flex flex-col items-center">
                  <img
                    src={goalxbrewing}
                    alt="goalxbrewing"
                    className="timeline-image h-48 w-48 rounded-full object-cover mt-2"
                  />
                </div>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-start hidden md:inline">
                <img
                  src={pure_project}
                  alt="pure_project"
                  className="timeline-image h-48 w-48 rounded-full object-cover mr-24"
                />
              </div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end mb-10">
                <time className="font-mono italic">May 22 2024</time>
                <div className="text-3xl font-black aesthet-nova">
                  Pure Project Miramar
                </div>
                <div className="aesthet-nova-h3 md:text-2xl">
                  Celebrated Asian American and Pacific Islander Heritage Month.
                  INGRAIN at @puremiramar NEW MENU ITEMS & KICK OFF @purebrewing
                  STRAWBERRY FEST RICE, BEER, HERITAGE
                </div>
                <div className="md:hidden flex flex-col items-center">
                  <img
                    src={pure_project}
                    alt="pure_project"
                    className="timeline-image h-48 w-48 rounded-full object-cover mt-2"
                  />
                </div>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-end hidden md:inline">
                <img
                  src={night_parade}
                  alt="night_parade"
                  className="timeline-image h-48 w-48 rounded-full object-cover ml-24"
                />
              </div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono italic">November 18 2023</time>
                <div className="text-3xl font-black aesthet-nova">
                  Night Parade Brewing Co.
                </div>
                <div className="aesthet-nova-h3 md:text-2xl">
                  First ever plates at @nightparadebrewing
                </div>
                <div className="md:hidden flex flex-col items-center">
                  <img
                    src={night_parade}
                    alt="night_parade"
                    className="timeline-image h-48 w-48 rounded-full object-cover mt-2"
                  />
                </div>
              </div>
              <hr />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Events;
