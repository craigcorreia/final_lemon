import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './Components/nav';
import Header from './Components/Header';
// import HomePage from '';
// import AboutPage from '';
// import MenuPage from '';
import BookingPage from './Components/Booking';
// import OrderOnlinePage from '';
// import LoginPage from '';

const App = () => {
    return (
        <>
            <Header />
            <Nav />
            <Routes>
                <Route path="/" element={''} />
                <Route path="/about" element={'' } />
                <Route path="/menu" element={'' } />
                <Route path="/reservations" element={<BookingPage />} />
                <Route path="/order-online" element={'' } />
                <Route path="/login" element={ ''} />
            </Routes>
        </>
    );
}

export default App;

