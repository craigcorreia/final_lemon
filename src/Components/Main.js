import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import ConfirmedBooking from './ConfirmedBooking';

// Reducer and initial state setup (same as previous example)
const timesReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            return {
                ...state,
                availableTimes: state.initialTimes
            };
        case 'SET_INITIAL_TIMES':
            return {
                ...state,
                initialTimes: action.payload,
                availableTimes: action.payload
            };
        default:
            return state;
    }
};

const fetchData = async (date) => {
    try {
        const response = await fetch(`https://api.example.com/available-times?date=${date}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.times;
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
};

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const initializeTimes = async () => {
    const todayDate = getTodayDate();
    const initialTimes = await fetchData(todayDate);
    return {
        initialTimes,
        availableTimes: initialTimes
    };
};

const submitAPI = async (formData) => {
    try {
        const response = await fetch('https://api.example.com/submit-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result.success; // Assuming the API returns { success: true/false }
    } catch (error) {
        console.error('Submit error:', error);
        return false;
    }
};

const Main = () => {
    const [state, dispatch] = useReducer(timesReducer, { initialTimes: [], availableTimes: [] });
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchAndSetTimes = async () => {
            const initialTimes = await initializeTimes();
            dispatch({ type: 'SET_INITIAL_TIMES', payload: initialTimes.availableTimes });
        };
        fetchAndSetTimes();
    }, []);

    const updateTimes = (selectedDate) => {
        dispatch({ type: 'UPDATE_TIMES', date: selectedDate });
    };

    // Function to handle form submission
    const submitForm = async (formData) => {
        const success = await submitAPI(formData);
        if (success) {
            navigate('/confirmation'); // Navigate to the confirmation page
        } else {
            alert('Booking failed. Please try again.');
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Welcome to Our Booking System</h1>} />
                <Route
                    path="/booking"
                    element={<BookingForm availableTimes={state.availableTimes} updateTimes={updateTimes} submitForm={submitForm} />}
                />
                <Route path="/confirmation" element={<ConfirmedBooking />} />
            </Routes>
        </Router>
    );
}

export default Main;
