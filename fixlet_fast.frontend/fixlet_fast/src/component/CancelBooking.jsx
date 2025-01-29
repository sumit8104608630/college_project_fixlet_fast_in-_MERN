import React from "react";

function CancelBooking(props) {
    const {bookId,funCancelBooking}=props;



  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Cancel Booking Policy</h2>
      <p className="text-gray-700 mb-4">
        If you cancel your booking, 20% of the service price will be charged as a cancellation fee. The refund will be processed within 24 to 48 hours.
      </p>
      <div className="flex justify-end">
        <button onClick={()=>funCancelBooking(bookId)} className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600">
          Cancel Booking
        </button>
      </div>
    </div>
  );
}

export default CancelBooking;
