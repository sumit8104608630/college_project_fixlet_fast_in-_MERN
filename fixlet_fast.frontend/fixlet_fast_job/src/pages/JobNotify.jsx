import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function JobNotify() {
  const [newService, setNewService] = useState(null);

  useEffect(() => {
    // Connect to your backend's Socket.IO server
    const socket = io("http://localhost:5000", {
      // withCredentials: true, // Uncomment if needed
    });

    // Log connection success
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server with ID:", socket.id);
    });

    // Listen for the `new_service` event
    socket.on("new_service", (data) => {
      console.log("Received new_service event:", data);
      setNewService(data); // Store received data in state
    });

    // Clean up connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const NotificationPopup = ({ notificationData, closePopup }) => {
    const { Address, booking } = notificationData;

    return (
      <div
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 transition-opacity"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Job Application</h3>
            <button
              onClick={closePopup}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-700">Booking Details</h4>
            <p className="text-sm text-gray-600">Order ID: {booking.orderId}</p>
            <p className="text-sm text-gray-600">Service Type: {booking.serviceType}</p>
            <p className="text-sm text-gray-600">Date: {new Date(booking.date).toLocaleString()}</p>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-700">User Address</h4>
            <p className="text-sm text-gray-600">{Address.userAddress}</p>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-700">Service Details</h4>
            <div className="flex mb-2">
              <img
                src={booking.products[0].subService.subServiceImage}
                alt="Service"
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div>
                <p className="text-sm font-semibold">{booking.products[0].subService.subServiceName}</p>
                <p className="text-xs text-gray-500">{booking.products[0].subService.serviceTime} minutes</p>
                <p className="text-sm text-gray-600">Total: ₹{booking.products[0].totalPrice}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">{booking.products[0].subService.note.join(", ")}</p>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => alert("Job Accepted")}
              className="px-4 py-2 bg-orange-500 text-gray-800 rounded-lg hover:bg-orange-600"
            >
              Accept
            </button>
            <button
              onClick={() => alert("Job Rejected")}
              className="px-4 py-2 bg-orange-500 text-gray-800 rounded-lg hover:bg-orange-600"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>Job Notify</h1>
      {newService && (
        <NotificationPopup
          notificationData={newService}
          closePopup={() => setNewService(null)}
        />
      )}
    </div>
  );
}

export default JobNotify;
