import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavBar";
import EditIcon from "../assets/edit.png";

const useFetchEvents = (currentTab) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      let url = getEventsUrl(currentTab);

      try {
        const res = await axios.get(url);
        const data = Array.isArray(res.data) ? res.data : [];

        if (data.length === 0) {
          throw new Error(`No ${currentTab} events found`);
        }

        const formattedData = formatEventDates(data);
        setEvents(formattedData);
        setHasError(false);
      } catch (err) {
        setEvents([]);
        setHasError(true);
        // setError(err.message);
        setError(`No ${currentTab} events found`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentTab]);

  return { events, loading, error, hasError };
};

// Helper functions
const getEventsUrl = (tab) => {
  switch (tab) {
    case "Upcoming":
      return "http://localhost:3001/get-upcoming-events";
    case "Past":
      return "http://localhost:3001/get-past-events";
    case "First Time":
      return "http://localhost:3001/get-first-time-events";
    default:
      return "http://localhost:3001/get-events";
  }
};

const formatEventDates = (events) =>
  events.map((event) => ({
    ...event,
    date: new Date(event.date).toLocaleDateString(),
  }));

const truncateDescription = (description) => {
  const MAX_LENGTH = 50;
  return description.length > MAX_LENGTH
    ? `${description.substring(0, MAX_LENGTH)}...`
    : description;
};

// Tab Menu Component inside the same file
const TabMenu = ({ currentTab, setCurrentTab }) => (
  <ul className="menu menu-horizontal bg-[#ff723a] rounded-lg rounded-bl-none rounded-br-none border border-[#F16935] border-b-0 p-0 text-xl">
    {["All", "Upcoming", "Past", "First Time"].map((tab) => (
      <li
        key={tab}
        className={`cursor-pointer ${
          currentTab === tab
            ? "bg-ingrain-board-color text-neutral-950"
            : "hover:bg-ingrain-board-color"
        } rounded-lg rounded-bl-none rounded-br-none`}
        onClick={() => setCurrentTab(tab)}
      >
        <a className="hover:bg-ingrain-board-color text-md font-semibold rounded-bl-none rounded-br-none">
          {tab}
        </a>
      </li>
    ))}
  </ul>
);

// Event Row Component inside the same file
const EventRow = ({
  event,
  selected,
  onCheckboxChange,
  onRowClick,
  onEditClick,
}) => (
  <tr
    className={`hover cursor-pointer ${selected ? "bg-[#ff723a]" : ""}`}
    onClick={(e) => onRowClick(event.id, e)}
  >
    <th className="p-4">
      <label>
        <input
          type="checkbox"
          className="checkbox"
          checked={!!selected}
          onChange={() => onCheckboxChange(event.id)}
        />
      </label>
    </th>
    <th className="p-1 text-md">{event.id}</th>
    <td className="p-1 text-lg">{event.title}</td>
    <td className="p-1 text-lg">{event.nameOfPlace}</td>
    <td className="p-1 text-lg">{event.address}</td>
    <td className="p-1 text-lg">{event.date}</td>
    <td className="p-1 text-lg">{event.time}</td>
    <td className="p-1 text-lg">{truncateDescription(event.description)}</td>
    <td className="p-1 text-lg">{event.image}</td>
    <td className="p-1 text-lg">{event.dateCreated}</td>
    <td className="p-4">
      <button
        className="btn btn-sm bg-ingrain-board-color hover:bg-neutral-950"
        onClick={(e) => {
          e.stopPropagation(); // Prevent the row click event
          onEditClick(event.id); // Handle the edit button click
        }}
      >
        <img src={EditIcon} alt="Edit" className="w-4 h-4" />
      </button>
    </td>
  </tr>
);

// Event Table Component inside the same file
const EventTable = ({
  loading,
  hasError,
  error,
  events,
  selectedEvents,
  handleCheckboxChange,
  handleRowClick,
  handleEditClick,
}) => (
  <div className="overflow-x-auto w-full bg-ingrain-board-color border border-[#F16935] border-tl-none rounded-lg rounded-tl-none p-1">
    <div className="overflow-x-auto w-full ">
      <table className="table table-xs table-pin-rows table-pin-cols w-full">
        <thead>
          <tr>
            <th className="p-1 text-lg"></th>
            <th className="p-1 text-lg">ID #</th>
            <td className="p-1 text-lg">Event Name</td>
            <td className="p-1 text-lg">Location</td>
            <td className="p-1 text-lg">Address</td>
            <td className="p-1 text-lg">Date</td>
            <td className="p-1 text-lg">Time</td>
            <td className="p-1 text-lg">Description</td>
            <td className="p-1 text-lg">Image URL</td>
            <td className="p-1 text-lg">Date Created</td>
            <td className="p-1 text-lg">Actions</td>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={10} className="text-center p-20">
                <span className="loading loading-spinner loading-lg">
                  Loading Events...
                </span>
              </td>
            </tr>
          ) : hasError ? (
            <tr>
              <td colSpan={10} className="text-center p-20">
                {error}
              </td>
            </tr>
          ) : events.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center p-20">
                No events to show!
              </td>
            </tr>
          ) : (
            events.map((event, index) => (
              <EventRow
                key={event.id}
                event={event}
                index={index}
                selected={selectedEvents[event.id]}
                onCheckboxChange={handleCheckboxChange}
                onRowClick={handleRowClick}
                onEditClick={handleEditClick}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminEvents = () => {
  const [currentTab, setCurrentTab] = useState("All");
  const [selectedEvents, setSelectedEvents] = useState({});
  const { events, loading, error, hasError } = useFetchEvents(currentTab);

  const handleCheckboxChange = (eventId) => {
    setSelectedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const handleRowClick = (eventId, e) => {
    if (e.target.type !== "checkbox") {
      handleCheckboxChange(eventId);
    }
  };

  const handleEditClick = (eventId) => {
    console.log(`Editing event with ID: ${eventId}`);
    // Redirect to edit page or open a modal here
  };

  return (
    <div>
      <AdminNavbar />
      <div className="drop-shadow-lg sm:p-0 md:p-8 lg:p-12">
        <h1 className="text-2xl font-bold mb-4">Manage Events</h1>
        <TabMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <EventTable
          loading={loading}
          hasError={hasError}
          error={error}
          events={events}
          selectedEvents={selectedEvents}
          handleCheckboxChange={handleCheckboxChange}
          handleRowClick={handleRowClick}
          handleEditClick={handleEditClick}
        />
        <div className="flex justify-end p-3 pr-1 space-x-8">
          <button
            className="btn bg-[#ff723a] hover:bg-ingrain-board-color"
            onClick={() => console.log("Add Event clicked")}
          >
            Add Event
          </button>
          <button
            className="btn bg-[#ff723a] hover:bg-ingrain-board-color"
            onClick={() => console.log("Delete Event clicked")}
          >
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
