import React from 'react';

const Bookings = ({ date, time, guests, occasion }) => {
    return (
        <div>
            <h2>Your Booking Details</h2>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <p>Guests: {guests}</p>
            <p>Occasion: {occasion}</p>
        </div>
    );
}

export default Bookings;
