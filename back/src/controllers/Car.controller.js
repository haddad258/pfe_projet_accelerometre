'use strict';

const Car = require('../models/Car.model');

exports.findAll = function(req, res) {
  Car.findAll(function(err, Car) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', Car);
    res.send(Car);
  });
};


exports.create = function(req, res) {
    const new_Car = new Car(req.body);

   console.log(req.body)
   if(req.body === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Car.create(new_Car, function(err, Car) {
            if (err)
            res.send(err );
            res.json({error:false,message:"Car added successfully!",data:Car});
        });
    }
};


exports.findById = function(req, res) {
    Car.findById(req.params.id, function(err, Car) {
        if (err)
        res.send(err);
        res.json(Car);
    });
};


exports.update = function(req, res) {
    console.log(req.body)
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Car.update(req.params.id, new Car(req.body), function(err, Car) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Car successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
  Car.delete( req.params.id, function(err, Car) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Car successfully deleted' });
  });
};