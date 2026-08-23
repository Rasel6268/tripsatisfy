const express = require('express');
const route = express.Router();

const Controller = require('./AirController');
route.post('/availability',Controller.availability);
route.post('/flight-info',Controller.flightInfo);

route.post('/shop',Controller.shop);
route.post('/fare-rules',Controller.fareRules);
route.post('/book',Controller.book);
route.post('/ticket-issue',Controller.ticketIssue);
route.post('/get-booking',Controller.getBooking);
route.post('/get-ticket',Controller.getTicket);
route.post('/get-tickets',Controller.getTickets);
route.post('/cancel-ticket',Controller.cancelTicket);
route.post('/cancel-pnr',Controller.cancelPNR);
route.post('/cancel-booking',Controller.cancelBooking);
route.get('/airport-codes',Controller.airports);
route.get('/universal-record',Controller.getUniversalRecord);




module.exports = route