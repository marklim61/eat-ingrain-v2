import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminEventsModal = ({ isOpen, onClose, event, onSave }) => {
  // state variables for form fields
  const [title, setTitle] = useState(event?.title || "");
  const [address, setAddress] = useState(event?.address || "");
  const [date, setDate] = useState(event?.date || "");
  const [time, setTime] = useState(event?.time || "");
  const [description, setDescription] = useState(event?.description || "");
  const [image, setImage] = useState(event?.image || "");
  const [imageFile, setImageFile] = useState(null);
  const [firstTime, setFirstTime] = useState(event?.isFirstTime || false);

  // reset form fields on modal open or when switching between events
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setAddress(event.address);
      setDate(new Date(event.date).toISOString().split("T")[0]); // convert to YYYY-MM-DD
      setTime(event.time);
      setDescription(event.description);
      setImage(event.image);
      setImageFile(null); // reset the image file when switching events
      setFirstTime(event.isFirstTime || false); // reset checkbox state
    } else {
      // reset the form when switching events
      resetFormFields();
    }
  }, [event, isOpen]);

  // helper to reset all form fields
  const resetFormFields = () => {
    setTitle("");
    setAddress("");
    setDate("");
    setTime("");
    setDescription("");
    setImage("");
    setImageFile(null);
    setFirstTime(false); // reset checkbox state
  };

  // handle image file selection and validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxFileSize = 5 * 1024 * 1024;

    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSize) {
        alert("Please upload an image smaller than 5MB.");
        setImage(""); // reset the preview
        setImageFile(null); // reset the image file
        e.target.value = ""; // reset the file input
      }

      const reader = new FileReader(); // reads the file
      reader.onloadend = () => {
        setImage(reader.result); // set the image preview URL
      };
      reader.readAsDataURL(file); // read the file as data URL
      setImageFile(file); // keep the original file for uploading
    } else {
      alert("Please select an image file.");
      setImage(""); // reset the preview if an invalid file is selected
      setImageFile(null); // reset the image file if invalid
      e.target.value = ""; // reset the file input
    }
  };

  // handle create or update event
  const handleSave = async (e) => {
    e.preventDefault(); // prevent the form from refreshing the page

    // make sure that all required fields are filled, this one for updating
    if (!title || !address || !date || !time || !description) {
      alert("Please fill in all fields and upload an image.");
      return; // ensure that an image is also provided
    }

    // if adding a new event, check if the user has selected an image
    if (!event && !imageFile) {
      alert("Please upload an image for the event.");
      return;
    }

    let imageUrl = event?.image || ""; // use the existing image URL if it exists

    try {
      // if user uploads an image, handle image upload to S3
      if (imageFile) {
        // if there's an existing image, delete it from S3
        if (event?.image) {
          await deleteOldImage(event.image);
        }

        // upload the new image to S3 and retrieve the new URL
        imageUrl = await uploadNewImage(imageFile);
      }

      // prep the event data object
      const eventData = {
        title,
        address,
        date,
        time,
        description,
        image: imageUrl,
        firstTime,
      };

      // if event exists, send a PATCH request to update the event
      if (event) {
        await updateEvent(event.id, eventData);
      } else {
        // if event doesn't exist, send a POST request to create the event
        await createEvent(eventData);
      }

      // after successful save, reset form and close modal
      resetFormFields();
      onClose();
    } catch (error) {
      handleSaveError(error, imageUrl);
    }
  };

  // helper to delete old image from S3
  const deleteOldImage = async (imageUrl) => {
    try {
      await axios.delete("http://localhost:3001/delete-image", {
        data: { imageUrl },
      });
      console.log("Old image deleted from S3");
    } catch (error) {
      console.error("Failed to delete old image from S3:", error);
    }
  };

  // helper to upload a new image to S3
  const uploadNewImage = async (file) => {
    const uploadUrlResponse = await axios.get("http://localhost:3001/s3Url"); // get secure upload URL
    const s3Url = uploadUrlResponse.data.url;

    // upload the image to S3 using the provided URL
    await axios.put(s3Url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    return s3Url.split("?")[0]; // return the clean URL without query params
  };

  // helper to update an existing event
  const updateEvent = async (id, eventData) => {
    const response = await axios.patch("http://localhost:3001/update-event", {
      id,
      ...eventData,
    });

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Failed to update event.");
    }

    onSave({ ...eventData, id }); // pass updated event data to parent
  };

  // helper to create a new event
  const createEvent = async (eventData) => {
    const response = await axios.post(
      "http://localhost:3001/create-event",
      eventData
    );

    if (response.status !== 201 && response.status !== 200) {
      throw new Error("Failed to create event.");
    }

    onSave(response.data); // pass new event data to parent
  };

  // handle save error, including image cleanup if necessary
  const handleSaveError = async (error, imageUrl) => {
    console.error("Error in handleSave:", error);
    // adding more error logging
    if (error.response) {
      console.error("Server responded with error:", error.response.data); // log the server error response
    } else if (error.request) {
      console.error("No response received from server:", error.request); // log if no response was received
    } else {
      console.error("Error setting up the request:", error.message); // log any other errors related to the request setup
    }

    if (error.response && error.response.status !== 201) {
      try {
        await axios.delete("http://localhost:3001/delete-image", {
          data: { imageUrl },
        });
        console.log("Image deleted from S3 after failed event creation.");
      } catch (deleteError) {
        console.error("Failed to delete image from S3:", deleteError);
      }
    }

    alert("Failed to save event. Please try again.");
  };

  // return null if the modal is closed
  if (!isOpen) return null;

  // render modal content
  return (
    <dialog id="admin_events_modal" className="modal" open={isOpen}>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">
            {event ? "Edit Event" : "Add Event"}
          </h3>
          <div className="py-4">
            <label className="block">Title:</label>
            <input
              type="text"
              className="input input-bordered w-full bg-white mb-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="block">Address:</label>
            <input
              type="text"
              className="input input-bordered w-full bg-white mb-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="block">Date:</label>
            <input
              type="date"
              selected={date}
              onChange={(date) => setDate(date)}
              className="input input-bordered w-full bg-white mb-2"
            />
            <label className="block">Time:</label>
            <input
              type="time"
              className="input input-bordered w-full bg-white mb-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <label className="block">Description:</label>
            <textarea
              className="textarea textarea-bordered w-full bg-white mb-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={firstTime}
                onChange={(e) => setFirstTime(e.target.checked)}
              />
              <label className="ml-2">Mark as First Time Event</label>
            </div>
            <label className="block">Image URL:</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full mb-2"
              onChange={handleImageChange}
            />
            <label className="block">Image Preview:</label>
            {image && (
              <img
                src={image}
                alt="Selected Image"
                className="w-full h-auto mb-4"
              />
            )}
          </div>
          <div className="modal-action">
            <button className="btn" type="button" onClick={handleSave}>
              {event ? "Save Changes" : "Add Event"}
              {/* if event exists, display "Save Changes" else "Add Event" */}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AdminEventsModal;
