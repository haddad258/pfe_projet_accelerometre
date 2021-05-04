const express = require('express');
const bodyParser = require('body-parser');
var dbConn = require('./config/db.config');

// create express app
const app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// Setup server port
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

// define a root route
app.post('/login', (req, res) => {
  console.log(req.body)
  dbConn.query("Select * from user  where email = ?", [req.body.email], function (err, resu) {
    if (resu.length === 0) {

      console.log(resu);
      res.json({ error: true, message: 'check login and password' });
    } else{
      const validpasswor = (resu[0].password === req.body.password) && (resu.length)
    validpasswor ? res.json({ error: false, message: 'login ok' }) : res.json({ error: true, message: 'check password' });
    }
    

  });
});

// Require building routes
const userRoutes = require('./src/routes/user.route')
const CarRoutes = require('./src/routes/Car.route')
const mesureroute =require('./src/routes/mesures.route')


// using as middleware
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/Cars', CarRoutes)
app.use('/api/v1/mesure', mesureroute)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});