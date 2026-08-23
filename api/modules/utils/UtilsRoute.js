const express = require('express');
const route = express.Router();

const Controller = require('./UtilsController');

route.post('/ref-data',Controller.referenceData);
route.post('/currency-convert',Controller.currencyConvert);

module.exports = route