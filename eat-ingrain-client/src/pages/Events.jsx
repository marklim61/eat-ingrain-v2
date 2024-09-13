import React, { useState, useEffect, useMemo } from "react";
import pure_project from "../assets/Ingrain_Background.jpg";
import night_parade from "../assets/instagram_gallery/firstpopup_v2.jpg";
import goalxbrewing from "../assets/instagram_gallery/secondpopup_v3.jpg";
import "./Style.css";
import event_bg from "../assets/instagram_gallery/event_BG.jpg";
import EventTimer from "../components/EventTimer";
import BackgroundBanner from "../components/BackgroundBanner";
import Navbar from "../components/Navbar";
import EventTimeline from "../components/EventTimeline";

const Events = () => {
  const eventDate = useMemo(() => new Date("2024-08-22T00:00:00"), []);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3001/get-events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      <div id="container1" className="relative">
        <Navbar/>
        <BackgroundBanner bgImage={event_bg} />
        <div className="relative z-1 flex flex-col justify-center items-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white aesthet-nova text-center">
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
          <EventTimer eventDate={eventDate} setColor="bg-ingrain-color-orange"/>
        </div>
      </div>

      <div id="container2" className="relative flex items-center justify-center p-4 pl-3 md:p-12 mb-24 mt-24 rounded-xl max-w-screen md:max-w-7xl mx-auto md:drop-shadow-2xl drop-shadow-xl bg-ingrain-board-color">
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          {events.map((event, index) => (
            <li key={index} id={event.id}> 
              <EventTimeline 
                eventDate={new Date(event.date).toDateString()} 
                eventTitle={event.title} 
                eventDescription={event.description}
                eventImage={event.image} 
                index = {index}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Events;

