import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    const res = http.get('https://test-booking-app.onrender.com/api/listings/recently-added');
};