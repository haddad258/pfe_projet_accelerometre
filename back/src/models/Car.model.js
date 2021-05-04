'Car strict';
var dbConn = require('../../config/db.config');


//Car object create
var Car = function (Car) {
    
    this.matricule = Car.matricule;
    this.capacity = Car.capacity;
    this.chauffeur =  Car.chauffeur
    this.carte_ip =  Car.carte_ip
    this.created_at = new Date();
};
Car.create = function (newCar, result) {
    dbConn.query("INSERT INTO Cars set ?", newCar, function (err, res) {
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
Car.findById = function (id, result) {
    dbConn.query("Select * from Cars where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Car.findAll = function (result) {
    dbConn.query("Select * from Cars", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('Cars : ', res);
            result(null, res);
        }
    });
};
Car.update = function (id, Car, result) {
    console.log(id)
   // dbConn.query("UPDATE Car SET name= `"+ Car.name+ "`,lastname=`"+ Car.lastname+ "`,email=`"+ Car.email+ "`,password=`"+ Car.password+ " `,description= `"+ Car.description+ " ,WHERE id = "+ id 
    
   dbConn.query( "UPDATE `Car` SET `name` = '"+ Car.name+"', `lastname` = '"+ Car.lastname+ "', `email` = '"+Car.email+"', `password` = '"+ Car.password+"', `description` = '"+ Car.description+"' WHERE (`id` = '"+ id +"')", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Car.delete = function (id, result) {
    dbConn.query("DELETE FROM Cars WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Car;