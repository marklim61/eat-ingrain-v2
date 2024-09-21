import React, { useState, useEffect } from "react";
import "./Style.css";
import event_bg from "../assets/instagram_gallery/event_BG.jpg";
import EventTimer from "../components/EventTimer";
import BackgroundBanner from "../components/BackgroundBanner";
import Navbar from "../components/Navbar";
import EventTimeline from "../components/EventTimeline";

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoadingPastEvent, setIsLoadingPastEvent] = useState(true); 
  const [isloadingUpcomingEvent, setIsLoadingUpcomingEvent] = useState(true);

  const fetchWithRetry = async (url, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Network response was not ok");
        return await res.json();
      } catch (err) {
        console.error(`Attempt ${i + 1} failed: ${err.message}`);
        if (i === retries - 1) throw err; // Throw error if no retries left
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
      }
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetchWithRetry("http://localhost:3001/get-upcoming-events");
        setUpcomingEvents(res);
        setIsLoadingUpcomingEvent(false);
      } catch (err) {
        console.error(err);
        setIsLoadingUpcomingEvent(true);
      } 
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const res = await fetchWithRetry("http://localhost:3001/get-past-events");
        setPastEvents(res);
        setIsLoadingPastEvent(false); // Stop loading
      } catch (err) {
        console.error(err);
        setIsLoadingPastEvent(true); // keep loading while there's error
      }
    };
    fetchPastEvents();
  }, []);

  const upcomingEvent = () => {
    const eventDate = new Date(upcomingEvents[0]?.date);
    return (
      <>
        <BackgroundBanner bgImage={upcomingEvents[0].image} />
        <div className="relative z-1 flex flex-col justify-center items-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white aesthet-nova text-center">
            JOIN US FOR OUR NEXT POPUP <br /> AT {upcomingEvents[0].nameOfPlace}
          </h1>
          <h4 className="text-white aesthet-nova-h2 mb-6 text-center text-xl">
            {upcomingEvents[0].address}
          </h4>
          <p className="text-xl md:text-2xl mb-6 text-white aesthet-nova text-center">
            {eventDate.toDateString()} <br /> {upcomingEvents[0].time}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white aesthet-nova text-center">
            Countdown to the event:
          </h2>
          <EventTimer eventDate={eventDate} setColor="bg-ingrain-color-orange"/>
        </div>
      </>
    );
  };

  const noUpcomingEvents = () => (
    <>
      <BackgroundBanner bgImage={event_bg} />
      <div className="relative z-1 flex flex-col justify-center items-center mb-24 p-12">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white aesthet-nova text-center">
          NO UPCOMING EVENTS
        </h1>
      </div>
    </>
  );

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const res = await fetchWithRetry(
          "http://localhost:3001/get-past-events"
        );
        setPastEvents(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPastEvents();
  }, []);

  if (isLoading) {
    return <div>Loading events...</div>; // Show loading spinner if necessary
  }

  return (
    <>
      <div id="container1" className="relative">
        <Navbar/>
        {isloadingUpcomingEvent || upcomingEvents.length === 0 ? noUpcomingEvents() : upcomingEvent()}
      </div>
      <div id="container2" className="relative flex items-center justify-center p-4 pl-3 md:p-12 mb-24 mt-24 rounded-xl max-w-screen md:max-w-7xl mx-auto md:drop-shadow-2xl drop-shadow-xl bg-ingrain-board-color">
        {isLoadingPastEvent ? <span className="loading loading-spinner text-primary"></span> :
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {pastEvents.map((event, index) => (
              <li key={index} id={event.id}>
                <EventTimeline
                  eventDate={new Date(event.date).toDateString()}
                  eventTitle={event.title}
                  eventDescription={event.description}
                  eventImage={event.image}
                  index={index}
                />
              </li>
            ))}
          </ul>
       }
      </div>
      <Footer />
    </>
  );
};

export default Events;
