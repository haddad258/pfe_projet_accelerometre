import React from 'react';
import Sidebar from '../components/Sidebar';
import ResponsiveContainer from "react-responsive-widget";

import { NavigationBar } from '../components/NavigationBar';
import { Table, Button } from 'react-bootstrap'
import { confirmAlert } from "react-confirm-alert";
import axios from 'axios';
import moment from "moment"
import "react-confirm-alert/src/react-confirm-alert.css"; // Import


class ListUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ListUsers: []



        };
    }
    componentDidMount() {
        axios.get("http://localhost:5000/api/v1/users").then((response) => {
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
            <div style={{ textAlign: "center" }}>   <h1  > List User </h1>
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
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>email</th>
                                        <th>description</th>
                                        <th>created_at</th>
                                        <th>action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.ListUsers.map((e, index) => (

                                        <tr key={index}>
                                            <td>{e.id} </td>
                                            <td>{e.name}</td>
                                            <td>{e.lastname}</td>
                                            <td>{e.email} </td>
                                            <td>{e.description} </td>
                                            <td>{moment(e.created_at).format("YYYY-MM-DD [at] HH:MM")} </td>
                                            <td>

                                                <Button
                                                    variant="danger"
                                                    onClick={() => this.Delette(e)}
                                                >
                                                    {" "}
                                                    <span className="fa fa-trash"></span>
                                                </Button>
                                                <Button
                                                    variant="info"
                                                    onClick={() => this.updateuser(e)}
                                                >
                                                    {" "}
                                                    <span className="fa fa-pen"></span>
                                                </Button>
                                            </td>
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
export default ListUser