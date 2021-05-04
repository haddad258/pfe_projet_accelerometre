import React from 'react';
import Sidebar from '../components/Sidebar';
import ResponsiveContainer from "react-responsive-widget";

import { NavigationBar } from '../components/NavigationBar';
import { Table, Button } from 'react-bootstrap'
import { confirmAlert } from "react-confirm-alert";
import axios from 'axios';
import moment from "moment"
import "react-confirm-alert/src/react-confirm-alert.css"; // Import


class Measures extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ListUsers: []



        };
    }
    componentDidMount() {
        axios.get("http://localhost:5000/api/v1/mesure").then((response) => {
            console.log(response.data)
            this.setState({ ListUsers: response.data })

        })
       

        
    }

    Delette(users) {
        console.log("hellodelet", users.id);
        confirmAlert({
          title: "Confirm Delete",
          message: "Are you sure to do Delete?",
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                axios
                  .delete("http://localhost:5000/api/v1/users/" + users.id)
                  .then(() => {
                    var array = [...this.state.ListUsers];
                    var index = array.indexOf(users);
                    if (index !== -1) {
                      array.splice(index, 1);
                      this.setState({ ListUsers: array });
                    }
                  });
              },
            },
            {
              label: "No",
              onClick: null,
            },
          ],
        });
    }

    updateuser(e){
        window.location.href= "/updateUser/"+e.id

    }

    render() {
        return (<div>
            <NavigationBar />
            <Sidebar />
            <div style={{ textAlign: "center" }}>   <h1  > List all Measures </h1>
            </div>
            <ResponsiveContainer>
                <div className="App">

                    <div className="app-row">
                        <div className="app-col-xs-12 app-col-md-2">
                        </div>
                        <div className="app-col-xs-12 app-col-md-9">
                            <Table striped responsive bordered hover size="lg">
                                <thead >
                                    <tr >
                                        <th style={{ "width": "100px" }} >#</th>
                                        <th>Axe x</th>
                                        <th>Axe y</th>
                                        <th>Axe z</th>
                                        <th>cars</th>
                                        <th>chauffeur</th>
                                        <th>date</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.ListUsers.map((e, index) => (

                                        <tr key={index}>
                                            <td>{e.id} </td>
                                            <td>{e.Axes_x}</td>
                                            <td>{e.Axes_y}</td>
                                            <td>{e.Axes_z} </td>
                                            <td>{e.Car? e.Car.matricule:""} </td>
                                            <td>{e.Car? e.Car.chauffeur:""} </td>
                                            <td>{moment(e.created_at).format("YYYY-MM-DD [at] HH:MM")} </td>
                                           
                                        </tr>
                                    ))}



                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>

            </ResponsiveContainer>

        </div>
        )
    }


}
export default Measures