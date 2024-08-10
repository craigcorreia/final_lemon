import React, { useState } from 'react';

const BookingForm = ({ availableTimes, updateTimes, submitForm }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [occasion, setOccasion] = useState('');

    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setSelectedDate(newDate);
        updateTimes(newDate);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            date: selectedDate,
            time: selectedTime,
            guests: numberOfGuests,
            occasion: occasion
        };
        submitForm(formData); // Call submitForm with form data
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="res-date">Choose date</label>
            <input
                type="date"
                id="res-date"
                value={selectedDate}
                onChange={handleDateChange}
            />
            
            <label htmlFor="res-time">Choose time</label>
            <select
                id="res-time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
            >
                {availableTimes.map((time) => (
                    <option key={time} value={time}>{time}</option>
                ))}
            </select>
            
            <label htmlFor="guests">Number of guests</label>
            <input
                type="number"
                placeholder="1"
                min="1"
                max="10"
                id="guests"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
            />
            
            <label htmlFor="occasion">Occasion</label>
            <select
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
            >
                <option value="">Select an occasion</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
            </select>
            
            <input type="submit" value="Make Your reservation" />
        </form>
    );
}

export default BookingForm;
