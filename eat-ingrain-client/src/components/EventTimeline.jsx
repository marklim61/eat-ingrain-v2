const EventTimeline = ({
    eventDate,
    eventTitle,
    eventDescription,
    eventImage,
    index
  }) => {
    const imagePosition = index % 2 === 0 ? 'timeline-end' : 'timeline-start';
    const textPosition = index % 2 === 0 ? 'timeline-start' : 'timeline-end';
    const textAlign = index % 2 === 0 ? 'text-end' : 'text-start';

    return (
      <>
        <div className={`${imagePosition} hidden md:inline`}>
          <img
            src={eventImage}
            alt={`${eventTitle} image`}
            className="timeline-image h-48 w-48 rounded-full object-cover ml-24 mr-24"
          />
        </div>
  
        <div className="timeline-middle flex justify-center items-center">
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
  
        <div className={`${textPosition} mb-10 md:${textAlign}`}>
          <time className="font-mono italic">{eventDate}</time>
          <div className="text-3xl font-black aesthet-nova">{eventTitle}</div>
          <div className="aesthet-nova-h3 md:text-2xl">{eventDescription}</div>
  
          {/* Mobile image view */}
          <div className="md:hidden flex flex-col items-center">
            <img
              src={eventImage}
              alt={`${eventTitle} image`}
              className="timeline-image h-48 w-48 rounded-full object-cover mt-2"
            />
          </div>
        </div>
  
        <hr className="border-t border-gray-200 my-4" />
      </>
    );
  };
  
  export default EventTimeline;
  