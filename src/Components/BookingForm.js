import React, { useState, useEffect } from 'react';

const BookingForm = ({ availableTimes, updateTimes, submitForm }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [occasion, setOccasion] = useState('');
    const [errors, setErrors] = useState({
        date: '',
        time: '',
        guests: '',
        occasion: ''
    });

    // Validate the form when submitting
    const validateForm = () => {
        const newErrors = { ...errors };
        if (!selectedDate) newErrors.date = 'Date is required';
        if (!selectedTime) newErrors.time = 'Time is required';
        if (numberOfGuests < 1) newErrors.guests = 'Number of guests must be at least 1';
        if (!occasion) newErrors.occasion = 'Occasion is required';
        setErrors(newErrors);
        return Object.values(newErrors).every(error => !error);
    };

    // Handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            const formData = {
                date: selectedDate,
                time: selectedTime,
                guests: numberOfGuests,
                occasion: occasion
            };
            submitForm(formData);
            // Clear form on successful submission
            setSelectedDate('');
            setSelectedTime('');
            setNumberOfGuests(1);
            setOccasion('');
            setErrors({ date: '', time: '', guests: '', occasion: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} aria-labelledby="booking-form-title">
            <h2 id="booking-form-title">Booking Form</h2>
            
            <fieldset>
                <legend>Reservation Details</legend>
                
                <div>
                    <label htmlFor="res-date">Choose date</label>
                    <input
                        type="date"
                        id="res-date"
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            updateTimes(e.target.value);
                        }}
                        required
                        aria-required="true"
                    />
                    {errors.date && <p className="error">{errors.date}</p>}
                </div>
                
                <div>
                    <label htmlFor="res-time">Choose time</label>
                    <select
                        id="res-time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                        aria-required="true"
                    >
                        <option value="">Select a time</option>
                        {availableTimes.map((time) => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                    {errors.time && <p className="error">{errors.time}</p>}
                </div>
                
                <div>
                    <label htmlFor="guests">Number of guests</label>
                    <input
                        type="number"
                        placeholder="1"
                        min="1"
                        max="10"
                        id="guests"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(e.target.value)}
                        required
                        aria-required="true"
                    />
                    {errors.guests && <p className="error">{errors.guests}</p>}
                </div>
                
                <div>
                    <label htmlFor="occasion">Occasion</label>
                    <select
                        id="occasion"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        required
                        aria-required="true"
                    >
                        <option value="">Select an occasion</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                    </select>
                    {errors.occasion && <p className="error">{errors.occasion}</p>}
                </div>
                
                <div>
                    <button
                        type="submit"
                        aria-label="Submit reservation"
                        disabled={Object.values(errors).some(error => error)}
                    >
                        Make Your Reservation
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default BookingForm;
