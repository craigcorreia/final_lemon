
import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmedBooking = () => {
    return (
        <div>
            <h1>Booking Confirmed!</h1>
            <p>Your reservation has been successfully booked.</p>
            <p>Thank you for choosing us. We look forward to serving you!</p>
            <Link to="/">Return to Home</Link>
        </div>
    );
}

export default ConfirmedBooking;
