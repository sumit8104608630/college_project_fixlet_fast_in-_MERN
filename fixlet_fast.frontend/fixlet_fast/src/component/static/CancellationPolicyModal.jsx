import React from "react";
import { CgDanger } from "react-icons/cg";

const CancellationPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="text-xl font-bold text-gray-800 border-b pb-2 flex justify-between items-center">
          <span>Cancellation Policy</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            ✕
          </button>
        </div>
        {/* Content */}
        <div className="mt-4">
          <table className="w-full text-gray-700 text-sm">
            <thead>
              <tr>
                <th className="text-left py-2">Time</th>
                <th className="text-left py-2">Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">Till 5 mins after the booking</td>
                <td className="py-2 text-orange-500 font-medium">Free</td>
              </tr>
              <tr>
                <td className="py-2">Within 12 hrs of the service</td>
                <td className="py-2">Up to ₹50</td>
              </tr>
              <tr>
                <td className="py-2">Within 3 hrs of the service</td>
                <td className="py-2">Up to ₹100</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 flex  items-center gap-2 text-green-500  text-base">
            <CgDanger/>
            No fee if a professional is not assigned
          </div>
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-800 font-bold">This fee goes to the professional</p>
            <p className="text-gray-700 text-sm">
              Their time is reserved for the service & they cannot get another
              job for the reserved time.
            </p>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicyModal;
