import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function JobNotify() {
  const [newService, setNewService] = useState(null);

  useEffect(() => {
    // Connect to your backend's Socket.IO server
    const socket = io("http://localhost:8000", {
      withCredentials: true,
    });

    socket.on("connection", () => {
      console.log("Connected to Socket.IO server with ID:", socket.id);
    });

    // Listen for the `new_service` event
    socket.on("new_service", (data) => {
      console.log("Received new_service event:", data);
      setNewService(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const NotificationPopup = ({ notificationData, closePopup }) => {
    const { Address, booking } = notificationData;

    return (
      <div className=" flex justify-center items-center bg-opacity-50 transition-opacity z-50">
        <div className="bg-white  rounded-lg shadow-lg w-full px-10  max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={closePopup}
              className="text-gray-500  hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>

          {/* Booking Details */}
          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-700">Booking Details</h4>
            <p className="text-sm text-gray-600">Order ID: {booking.orderId}</p>
            <p className="text-sm text-gray-600">Service Type: {booking.serviceType}</p>
            <p className="text-sm text-gray-600">Date: {new Date(booking.date).toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Amount: ₹{booking.totalAmount}</p>
          </div>

          {/* User Address */}
          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-700">User Address</h4>
            <p className="text-sm text-gray-600">{Address.userAddress}</p>
            <p className="text-sm text-gray-600">
              City: {Address.city}, State: {Address.state}
            </p>
          </div>

          {/* Service Details */}
          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-700">Service Details</h4>
            {booking.products.map((product, index) => (
              <div key={index} className="flex mb-4 border-b pb-2">
                <img
                  src={product.subService.subServiceImage}
                  alt="Service"
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div>
                  <p className="text-sm font-semibold">{product.subService.subServiceName}</p>
                  <p className="text-xs text-gray-500">
                    Service Time: {product.subService.serviceTime} minutes
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ₹{product.subService.totalPrice}
                  </p>
                  <p className="text-xs text-gray-500">
                    Notes: {product.subService.note?.join(", ") || "No additional notes"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Accept/Reject Buttons */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => {
                alert("Job Accepted");
                closePopup();
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Accept
            </button>
            <button
              onClick={() => {
                alert("Job Rejected");
                closePopup();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
