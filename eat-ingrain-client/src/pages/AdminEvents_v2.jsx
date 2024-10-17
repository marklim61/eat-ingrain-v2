import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavBar";
import EditIcon from "../assets/edit.png";
import AdminEventsModal from "../components/AdminEventsModal";

const useFetchEvents = (currentTab) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasError, setHasError] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    let url = getEventsUrl(currentTab);

    try {
      const res = await axios.get(url);
      // console.log("Response data:", res.data); // inspect the data
      const data = Array.isArray(res.data) ? res.data : [];

      if (data.length === 0) {
        throw new Error(`No ${currentTab} events found`);
      }

      // filter events for the timeline tab to include only first-time events
      const filteredData =
        currentTab === "Timeline"
          ? data.filter((event) => event.firstTime)
          : data;

      const formattedData = formatEventDates(filteredData);
      setEvents(formattedData);
      setHasError(false);
    } catch (err) {
      setEvents([]);
      setHasError(true);
      setError(`No ${currentTab} events found`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [currentTab]);

  return { events, loading, error, hasError, setEvents, fetchEvents };
};

const getEventsUrl = (tab) => {
  const urls = {
    Upcoming: "http://localhost:3001/get-upcoming-events",
    Past: "http://localhost:3001/get-past-events",
    Timeline: "http://localhost:3001/get-first-time-events",
    Duplicates: "http://localhost:3001/get-duplicate-events",
  };
  return urls[tab] || "http://localhost:3001/get-events";
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
// const TabMenu = ({ currentTab, setCurrentTab }) => (
//   <ul className="menu menu-horizontal bg-[#ff723a] rounded-lg rounded-bl-none rounded-br-none border border-[#F16935] border-b-0 p-0 text-xl">
//     {["All", "Upcoming", "Past", "Timeline", "Duplicates"].map((tab) => (
//       <li
//         key={tab}
//         className={`cursor-pointer ${
//           currentTab === tab
//             ? "bg-ingrain-board-color text-neutral-950"
//             : "hover:bg-ingrain-board-color"
//         } rounded-lg rounded-bl-none rounded-br-none`}
//         onClick={() => setCurrentTab(tab)}
//       >
//         <a className="hover:bg-ingrain-board-color text-md font-semibold rounded-bl-none rounded-br-none">
//           {tab}
//         </a>
//       </li>
//     ))}
//   </ul>
// );

// Updated Tab Menu Component
const TabMenu = ({ currentTab, setCurrentTab }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    setIsDropdownOpen(false); // close the dropdown after selection
  };

  return (
    <>
      {/* Dropdown for mobile screens */}
      <div
        className={`dropdown sm:hidden ${
          isDropdownOpen ? "dropdown-open" : ""
        }`}
      >
        <div
          tabIndex={0}
          role="button"
          className="btn m-1"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
        >
          {currentTab}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
        >
          {["All", "Upcoming", "Past", "Timeline", "Duplicates"].map((tab) => (
            <li
              key={tab}
              onClick={() => {
                handleTabClick(tab);
                document.activeElement.blur();
              }}
            >
              <a>{tab}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Horizontal tab menu for larger screens */}
      <ul className="hidden menu sm:menu-horizontal bg-[#ff723a] rounded-lg rounded-bl-none rounded-br-none border border-[#F16935] border-b-0 p-0 text-xl">
        {["All", "Upcoming", "Past", "Timeline", "Duplicates"].map((tab) => (
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
    </>
  );
};

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
          onEditClick(event); // pass the whole event object
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
    <table className="table table-xs table-pin-rows table-pin-cols w-full">
      <thead>
        <tr>
          <th className="p-1 text-lg"></th>
          <th className="p-1 text-lg">ID #</th>
          <td className="p-1 text-lg">Title</td>
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
);

const AdminEvents = () => {
  const [currentTab, setCurrentTab] = useState("All");
  const [selectedEvents, setSelectedEvents] = useState({});
  const [selectedForEditEvent, setSelectedForEditEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { events, loading, error, hasError, setEvents, fetchEvents } =
    useFetchEvents(currentTab);

  // add the useEffect here to log current events
  useEffect(() => {
    // console.log("Current events:", events);
  }, [events]);

  const handleCheckboxChange = (eventId) => {
    setSelectedEvents((prevSelected) => ({
      ...prevSelected,
      [eventId]: !prevSelected[eventId], // toggle selection
    }));
  };

  const handleRowClick = (eventId, e) => {
    if (e.target.type !== "checkbox") {
      handleCheckboxChange(eventId);
    }
  };

  const handleEditClick = (event) => {
    setSelectedForEditEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // close the modal
    setSelectedForEditEvent(null); // reset selected event on close
  };

  const handleAddEvent = () => {
    setSelectedForEditEvent(null); // reset selected event on add
    setIsModalOpen(true); // open the modal when the button is clicked
  };

  const handleSaveEvent = async (newEvent) => {
    // call fetchEvents to refresh the events list after adding a new event
    await fetchEvents();
  };

  const handleDeleteEvent = async () => {
    // retrieve the selected event IDs from the selectedEvents state
    const selectedEventIds = Object.keys(selectedEvents).filter(
      (eventId) => selectedEvents[eventId]
    );

    // if no events are selected, show an alert
    if (selectedEventIds.length === 0) {
      alert("Please select at least one event to delete.");
      return;
    }

    try {
      // delete the selected events
      const eventsToDelete = events.filter((event) =>
        selectedEventIds.includes(event.id.toString())
      );

      const response = await axios.post("http://localhost:3001/delete-event", {
        eventIds: selectedEventIds, // pass the selected event IDs
        images: eventsToDelete.map((event) => event.image), // pass the image URLs
      });

      console.log("Response from delete-event:", response.data); // log server response

      fetchEvents(); // refresh the events list
      setSelectedEvents({}); // reset the selected events
    } catch (error) {
      console.error("Error deleting events:", error);
      alert("An error occurred while deleting events.");
    }
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
            onClick={handleAddEvent}
          >
            Add Event
          </button>
          <button
            className="btn bg-[#ff723a] hover:bg-ingrain-board-color"
            onClick={() => {
              const selectedEventIds = Object.keys(selectedEvents).filter(
                (eventId) => selectedEvents[eventId]
              );
              if (selectedEventIds.length === 0) {
                alert("Please select at least one event to delete.");
              } else {
                document.getElementById("delete_confirm_modal").showModal();
              }
            }}
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <dialog
        id="delete_confirm_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">
            Are you sure you want to delete the selected events?
          </p>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={() => {
                document.getElementById("delete_confirm_modal").close();
                handleDeleteEvent();
              }}
            >
              Confirm
            </button>
            <button
              className="btn"
              onClick={() =>
                document.getElementById("delete_confirm_modal").close()
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {isModalOpen && (
        <div className="fixed inset-0 bg-neutral-950 opacity-50 z-10"></div>
      )}
      <AdminEventsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        event={selectedForEditEvent}
      />
    </div>
  );
};

export default AdminEvents;
