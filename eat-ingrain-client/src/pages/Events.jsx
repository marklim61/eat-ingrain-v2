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
  const event1Desc = `
    We are back for da summer and officially popping up at
    @goalxbrewing on Sunday, June 23 from 2pm - sellout! Come by
    for some solid beers and kick it with us on their outside
    patio. Thank you all for your patience and continued support
  `
  const event2Desc = `
    Celebrated Asian American and Pacific Islander Heritage Month.
    INGRAIN at @puremiramar NEW MENU ITEMS & KICK OFF @purebrewing
    STRAWBERRY FEST RICE, BEER, HERITAGE
  `

  const event3Desc = `First ever plates at @nightparadebrewing`

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
        <li> 
          <EventTimeline 
          eventDate={'June 23 2024'} 
          eventTitle={'POPUP AT GOAL. BREWING'} 
          eventDescription={event1Desc}
          eventImage={goalxbrewing} 
          imagePosition={'timeline-end'}
          textPosition={'timeline-start'}
          textAlign={'text-end'}/>
        </li>
        <li> 
          <EventTimeline 
          eventDate={'May 22 2024'} 
          eventTitle={'Pure Project Miramar'} 
          eventDescription={event2Desc}
          eventImage={pure_project} 
          imagePosition={'timeline-start'}
          textPosition={'timeline-end'}
          textAlign={'text-start'}/>
        </li>
        <li> 
          <EventTimeline 
          eventDate={'November 18 2023'} 
          eventTitle={'Night Parade Brewing Co.'} 
          eventDescription={event3Desc}
          eventImage={night_parade} 
          imagePosition={'timeline-end'}
          textPosition={'timeline-start'}
          textAlign={'text-end'}/>
        </li>
      </ul>
    </div>
    </>
  )}

export default Events;
