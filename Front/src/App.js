import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from './Home';
import  About  from './About';
import { NoMatch } from './NoMatch';
import LoginView from './Login'
import Adduser from './User/Adduser'
import ListUser from './User/ListUser'
import updateUser from  './User/updateUser'
import ListCars from './Cars/ListCars'
import AddCars from './Cars/AddCars'
import Dashbord from './Dashboard/Dashbord'
import Measures from './measures/Measures'
import Measuresid from './measures/Measuresid'




function App() {
  return (
    <React.Fragment>
      <Router>


        <Switch>
          <Route exact path="/" component={LoginView} />
          <Route exact path="/adduser" component={Adduser} />
          <Route exact path="/ListUser" component={ListUser} />
          <Route exact path="/updateUser/:id" component={updateUser} />
          <Route exact path="/ListCars" component={ListCars} />
          <Route exact path="/Home" component={Dashbord} />
          <Route exact path="/about" component={About} />
          <Route exact path="/Measures" component={Measures} />
          <Route exact path="/Measuresid/:id" component={Measuresid} />

          
          <Route path="/AddCars" component={AddCars} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
