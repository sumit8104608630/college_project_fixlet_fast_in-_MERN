import React from 'react'
import { useSearchParams } from 'react-router';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';



function BookingPage() {
  const [searchParams] = useSearchParams();
  return (
    <div>
      <h1>Booking Page</h1>
    </div>
  )
}

export default BookingPage