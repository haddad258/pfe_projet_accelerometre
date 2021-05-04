const mesure = require('../models/mesure.model');
const Car = require('../models/Car.model');



exports.findAll = function(req, res) {
    var cars
   Car.findAll(function(err, carsr) {
    console.log('mesure')
    if (err)
    console.log(err);
    
    cars =carsr
  });
    mesure.findAll(function(err, mesure) {
      console.log('mesure')
      if (err)
      res.send(err);
      mesure.map(e=> e.Car = cars.filter(el=> el.id ==e.Car)[0])
      res.send(mesure);
    });
  };


  exports.findById = function(req, res) {
    mesure.findById(req.params.id, function(err, Car) {
        if (err)
        res.send(err);
        res.json(Car);
    });
};
  