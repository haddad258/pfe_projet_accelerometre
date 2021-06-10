import React from 'react';
import Sidebar from '../components/Sidebar';
import ResponsiveContainer from "react-responsive-widget";

import { NavigationBar } from '../components/NavigationBar';
import { Table, Button } from 'react-bootstrap'
import { confirmAlert } from "react-confirm-alert";
import axios from 'axios';
import moment from "moment"
import "react-confirm-alert/src/react-confirm-alert.css"; // Import
import { object } from 'yup';


class Measures extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ListUsers: []



        };
    }
    componentDidMount() {
        axios.get("https://api.thingspeak.com/channels/1378020/feeds.json?api_key=AC511RQQSCI5B42W&results=100000").then((response) => {
            console.log(response.data)
            this.setState({ ListUsers: response.data.feeds.sort((a,b)=> {
                return b.entry_id - a.entry_id
            }) })

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
   reloaddata(){
       this.componentDidMount()
   }


    updateuser(e){
        window.location.href= "/updateUser/"+e.id
    }
    

    render() {
        return (<div>
            <NavigationBar />

            <Sidebar />
            <div style={{ textAlign: "center" }}>   <h1  > List all Measures </h1>
            <Button onClick={()=>this.reloaddata()}> reloaddata</Button>

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
                                        <th>ip _ cars</th>
                                        <th>date</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.ListUsers.map((e, index) => (

                                        <tr key={index}>
                                            <td>{e.entry_id} </td>
                                            <td>{e.field2}</td>
                                            <td>{e.field3}</td>
                                            <td>{e.field4} </td>
                                            <td>{e.field1} </td>
                                            <td>{e.created_at} </td>
                                           
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