const AirService = require('./AirService');
const moment = require('moment');

class AirController {

    availability(req, res, next) {
        try {
            let params = req.body;
            AirService.availability(params).then(response => {
                return res.status(200).json(response);
            },
                err => {
                    return res.status(400).json(err);
                }
            );

        } catch (e) {
            return res.status(500).json(e);
        }
    }

    flightInfo(req, res, next) {
        try {
            let params = req.body;
            //return res.status(200).json(params);
            AirService.flightInfo(params).then(response => {
                return res.status(200).json(response);
            },
                err => {
                    return res.status(400).json(err);
                }
            );

        } catch (e) {
            return res.status(500).json(e);
        }
    }

    shop(req, res, next) {
        try {
            let params = req.body;
            AirService.shop(params).then(response => {
                return res.status(200).json(response);
            },
                err => {
                    return res.status(200).json(err);
                }
            );
        } catch (e) {
            return res.status(500).json(e);
        }
    }
    fareRules(req, res, next) {
        try {
            let params = req.body;
            AirService.fareRules(params).then(response => {
                return res.status(200).json(response);
            },
                err => {
                    return res.status(200).json(err);
                }
            );
        } catch (e) {
            return res.status(500).json(e);
        }
    }
    book(req, res, next) {
        try {

            let params = req.body;
            params.tau = moment().utcOffset('+06:00').add(2,'m');
            AirService.book(params).then(
                response => {
                    return res.status(200).json(response);
                },
                err => {
                    return res.status(400).json(err);
                }
            );

        } catch (e) {
            return res.status(500).json(e);
        }
    }
    ticketIssue(req, res, next) {
        try {

            let params = req.body;
            AirService.ticket(params).then(response => {
                return res.status(200).json(response);
            },
                err => {
                    return res.status(400).json(err);
                }
            );

        } catch (e) {
            return res.status(500).json(e);
        }
    }
    getBooking(req, res, next) {
        try {
            // let params = {
            //     pnr: 'BMNMLK',
            //   };
            let params = req.body;
            AirService.getBooking(params).then(response => {
                return res.status(200).json(response);
            },
                err => {
                    return res.status(400).json(err);
                }
            );

        } catch (e) {
            return res.status(500).json(e);
        }
    }
    getTicket(req, res, next) {
        try {
            // let params = {
            //     ticketNumber: '0649902789373',
            //   };
            let params = req.body;
            AirService.getTicket(params).then(response => {
                return res.status(200).json(response);
            },
                err => {
                    return res.status(400).json(err);
                }
            );

        } catch (e) {
            return res.status(500).json(e);
        }
    }
    getTickets(req, res, next) {
        try {
            // let params = {
            //     pnr: 'RLC001',
            //   };
            let params = req.body;
            AirService.getTickets(params).then(response => {
                return res.status(200).json(response);
            },
                err => {
                    return res.status(400).json(err);
                }
            );

        } catch (e) {
            return res.status(500).json(e);
        }
    }
    cancelTicket(req, res, next) {
        try {
            // let params = {
            //     ticketNumber: '0649902789373',
            //   };
            let params = req.body;
            AirService.cancelTicket(params).then(response => {
                return res.status(200).json(response);
            },
                err => {
                    return res.status(400).json(err);
                }
            );

        } catch (e) {
            return res.status(500).json(e);
        }
    }
    cancelPNR(req, res, next) {
        try {
            // let params = {
            //     pnr: 'RLC001',
            //     cancelTickets: true,
            //   };
            let params = req.body;
            //return res.status(300).json(params);
            params.cancelTickets = true;
            AirService.cancelPNR(params).then(response => {
                return res.status(200).json(response);
            },
                err => {
                    return res.status(400).json(err);
                }
            );

        } catch (e) {
            return res.status(500).json(e);
        }
    }
    cancelBooking(req, res, next) {
        try {
            // let params = {
            //     pnr: 'RLC001',
            //     ignoreTickets: true,
            //   };
            let params = req.body;
           
            AirService.cancelPNR(params).then(response => {
                return res.status(200).json(response);
            },
                err => {
                    return res.status(400).json(err);
                }
            );

        } catch (e) {
            return res.status(500).json(e);
        }
    }

    getUniversalRecord(req, res, next) {
        try {
            //let params = req.body;
            const params = {
                universalRecordLocatorCode: 'DAC',
            };
            AirService.getUniversalRecord(params).then(response => {
                return res.status(200).json(response);
            },
                err => {
                    return res.status(400).json(err);
                }
            );
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    // Airport codes by country

    airports(req, res, next) {
        try {

            let response = require('../../json/airport_codes.json');
            let limit = req.query.limit || 10;
            let keyword = req.query.keyword || '';

            // search 
            const search = require('../../search-json.js');
            let searchResult = [];

            // get result from search alogorithom
            let getResults = (result) => {
                // set data limit
                if (limit >= 0 && result.length > limit) {
                    result.length = limit
                }
                searchResult = result;
            }
            if (keyword !== '') {
                search(keyword, response, getResults, [])
            }
            return res.status(200).json(searchResult);
        } catch (e) {
            return res.status(500).json(e);
        }
    }


    // sample of methods
    sample(req, res, next) {
        try {
            let response = "sample";
            return res.status(200).json(response);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

}



module.exports = new AirController;
