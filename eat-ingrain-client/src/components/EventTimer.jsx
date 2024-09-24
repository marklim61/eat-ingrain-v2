import React, { useState, useEffect } from "react";

const EventTimer = ({eventDate, setColor}) => {
    // const eventDate = useMemo(() => new Date("2024-08-22T00:00:00"), []);
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
        <>
        <div className="grid grid-flow-col gap-2 md:gap-5 text-center auto-cols-max mx-auto mb-10">
            <div className={`flex flex-col p-2 ${setColor} rounded-box text-neutral-content`}>
                <span className="countdown font-mono text-4xl md:text-5xl">
                    {timeRemaining.days < 10
                        ? `00${timeRemaining.days}`.slice(-3)
                        : timeRemaining.days}
                </span>
                days
            </div>
            <div className={`flex flex-col p-2 ${setColor} rounded-box text-neutral-content`}>
                <span className="countdown font-mono text-4xl md:text-5xl">
                    {timeRemaining.hours < 10
                        ? `00${timeRemaining.hours}`.slice(-2)
                        : timeRemaining.hours}
                </span>
                hours
            </div>
            <div className={`flex flex-col p-2 ${setColor} rounded-box text-neutral-content`}>
                <span className="countdown font-mono text-4xl md:text-5xl">
                    {timeRemaining.minutes < 10
                        ? `00${timeRemaining.minutes}`.slice(-2)
                        : timeRemaining.minutes}
                </span>
                min
            </div>
            <div className={`flex flex-col p-2 ${setColor} rounded-box text-neutral-content`}>
                <span className="countdown font-mono text-4xl md:text-5xl">
                    {timeRemaining.seconds < 10
                        ? `00${timeRemaining.seconds}`.slice(-2)
                        : timeRemaining.seconds}
                </span>
                sec
            </div>
        </div>
        </>
    )
}

export default EventTimer