'user strict';
var dbConn = require('../../config/db.config');


//user object create
var user = function (user) {
    
    this.name = user.name;
    this.lastname = user.lastname;
    this.email =  user.email
    this.password =  user.password
    this.description= user.description
    this.created_at = new Date();
};
user.create = function (newuser, result) {
    dbConn.query("INSERT INTO user set ?", newuser, function (err, res) {
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
user.findById = function (id, result) {
    dbConn.query("Select * from user where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
user.findAll = function (result) {
    dbConn.query("Select * from user", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};
user.update = function (id, user, result) {
    console.log(id)
   // dbConn.query("UPDATE user SET name= `"+ user.name+ "`,lastname=`"+ user.lastname+ "`,email=`"+ user.email+ "`,password=`"+ user.password+ " `,description= `"+ user.description+ " ,WHERE id = "+ id 
    
   dbConn.query( "UPDATE `user` SET `name` = '"+ user.name+"', `lastname` = '"+ user.lastname+ "', `email` = '"+user.email+"', `password` = '"+ user.password+"', `description` = '"+ user.description+"' WHERE (`id` = '"+ id +"')", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
user.delete = function (id, result) {
    dbConn.query("DELETE FROM user WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = user;