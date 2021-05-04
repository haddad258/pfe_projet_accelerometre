'mesures strict';
var dbConn = require('../../config/db.config');


//mesures object create
var mesure = function (mesures) {
    
    this.Axes_x = mesures.Axes_x;
    this.Axes_y = mesures.Axes_y;
    this.Axes_z =  mesures.Axes_z
    this.date =  mesures.date
    this.mesures = mesures.date
};

mesure.findAll = function (result) {
    dbConn.query("Select * from measure", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('mesure : ', res);
            result(null, res);
        }
    });
};

mesure.findById = function (id, result) {
    dbConn.query("Select * from measure where Car = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = mesure;