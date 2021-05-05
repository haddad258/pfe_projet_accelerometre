'mesures strict';
var dbConn = require('../../config/db.config');


//mesures object create
var mesure = function (mesures) {

    this.Axes_x = mesures.Axes_x;
    this.Axes_y = mesures.Axes_y;
    this.Axes_z = mesures.Axes_z;
    this.ip_address = mesures.ip
    this.date = new Date();
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
mesure.create = function (measure, result) {
    dbConn.query("INSERT INTO measure set ?", measure, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
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