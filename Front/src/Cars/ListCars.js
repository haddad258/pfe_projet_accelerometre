import React from 'react';
import Sidebar from '../components/Sidebar';
import ResponsiveContainer from "react-responsive-widget";

import { NavigationBar } from '../components/NavigationBar';
import { Table, Button } from 'react-bootstrap'
import { confirmAlert } from "react-confirm-alert";
import axios from 'axios';
import moment from'moment'
import "react-confirm-alert/src/react-confirm-alert.css"; // Import


class ListCars extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ListCars: []



        };
    }
    componentDidMount() {
        axios.get("http://localhost:5000/api/v1/Cars").then((response) => {
            console.log(response.data)
            this.setState({ ListCars: response.data })

        })
    }

    Delette(Cars) {
        console.log("hellodelet", Cars.id);
        confirmAlert({
            title: "Confirm Delete",
            message: "Are you sure to do Delete?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        axios
                            .delete("http://localhost:5000/api/v1/Cars/" + Cars.id)
                            .then(() => {
                                var array = [...this.state.ListCars];
                                var index = array.indexOf(Cars);
                                if (index !== -1) {
                                    array.splice(index, 1);
                                    this.setState({ ListCars: array });
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

    updateCar(e) {
        window.location.href = "/Measuresid/" + e.id

    }

    render() {
        return (<div>
            <NavigationBar />
            <Sidebar />
            <div style={{ textAlign: "center" }}>   <h1  > List Car   <Button
                variant="info"
                onClick={() => window.location.href = "/AddCars"}
            >
                {" "}
                <span className="fa fa-plus"></span>
            </Button></h1>

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
                                        <th>matricule</th>
                                        <th>capacity</th>
                                        <th>chauffeur</th>
                                        <th>carte_ip</th>
                                        <th>create at</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.ListCars.map((e, index) => (

                                        <tr key={index}>
                                            <td>{e.id} </td>
                                            <td>{e.matricule}</td>
                                            <td>{e.capacity}</td>
                                            <td>{e.chauffeur} </td>
                                            <td>{e.carte_ip} </td>
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
                                                    onClick={() => this.updateCar(e)}
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
export default ListCars