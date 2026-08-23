const UtilsService = require('./UtilsService');

const { v4: uuidv4 } = require('uuid');

class UtilsController{

    referenceData(req, res, next){
        /* const params = {
            dataType: "HotelAmenities",
            TraceId: uuid()
        }; */
        try{
            let params = req.body;
            params.TraceId = uuidv4(); //uuid();
              UtilsService.referenceData(params).then(response => {
                    return res.status(200).json(response);
                },
                err => {
                   return res.status(400).json(err);
                }
            );
        }catch(e){
            return res.status(500).json(e);
        }
    }
    currencyConvert(req, res, next){
        /* const params = {
            dataType: "HotelAmenities",
            TraceId: uuid()
        }; */
        try{
            let params = {
                currencies: [req.body],
              };
              UtilsService.currencyConvert(params).then(response => {
                    return res.status(200).json(response[0] || {});
                },
                err => {
                   return res.status(400).json(err);
                }
            );
        }catch(e){
            return res.status(500).json(e);
        }
    }

}

module.exports = new UtilsController;