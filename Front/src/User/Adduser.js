import React, { Component } from "react";
import ResponsiveContainer from "react-responsive-widget";
import { Form } from 'react-bootstrap'
import Sidebar from '../components/Sidebar';
import { NavigationBar } from '../components/NavigationBar';
import axios from "axios";




class Adduser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            lastname: '',
            password: '',
            email: '',
            description: '',
            passwordc: '',
            validpassword: false



        };
    }



    render() {



        return (
            <div>
                <NavigationBar />
                <Sidebar />
                <div style={{ textAlign: "center" }}>   <h1  > Add User </h1>
                </div>
                <ResponsiveContainer>
                    <div className="App">

                        <div className="app-row">
                            <div className="app-col-xs-12 app-col-md-1">
                            </div>
                            <div className="app-col-xs-12 app-col-md-5">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>email</Form.Label>
                                        <Form.Control type="email" onChange={(e) => this.setState({ email: e.target.value })} placeholder="Enter email" />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                                                 </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicname">
                                        <Form.Label>name</Form.Label>
                                        <Form.Control type="text" onChange={(e) => this.setState({ name: e.target.value })} placeholder="name" />
                                        <Form.Text className="text-muted">
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasiclastname">
                                        <Form.Label>lastname</Form.Label>
                                        <Form.Control type="text" onChange={(e) => this.setState({ lastname: e.target.value })} placeholder="lastname" />
                                        <Form.Text className="text-muted">
                                        </Form.Text>
                                    </Form.Group>

                                </Form>
                            </div>
                            <div className="app-col-xs-12 app-col-md-5">
                                <Form>


                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" onChange={(e) => this.setState({ password: e.target.value })} placeholder="Password" />
                                        <Form.Text className="text-muted">
                                            confirm password      </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPasswordc">
                                        <Form.Label>confirme password</Form.Label>
                                        <Form.Control type="password" isInvalid={this.state.validpassword} onChange={(e) => this.setState({ passwordc: e.target.value })} placeholder="confirme password" />
                                        {this.state.validpassword && <Form.Text className="text-muted">
                                            check confitm passwor     </Form.Text>}
                                    </Form.Group>
                                    <Form.Group controlId="formBasicDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" onChange={(e) => this.setState({ description: e.target.value })} placeholder="Description" />
                                        <Form.Text className="text-muted">
                                        </Form.Text>
                                    </Form.Group>



                                </Form>




                                <div style={{ textAlign: "center" }}>
                                    <br />
                                    <button
                                        type="submit"
                                        onClick={() => this.handleSubmit()}
                                        className="btn btn-primary btn-lg"
                                    >
                                        Submit
								</button>

                                </div>


                            </div>
                        </div>
                    </div>

                </ResponsiveContainer>
            </div>
        );
    }








    handleSubmit(e) {
        if (this.state.passwordc !== this.state.password) {

            this.setState({ validpassword: true })
        } else {
            this.setState({ validpassword: false })

            console.log(this.state)
            axios.post("http://localhost:5000/api/v1/users", this.state).then((response) => {
                console.log(response.data)
                alert(" Add succefull")

                window.location.href= "/ListUser"


            }).catch(()=>{

                alert(" check your server")
                window.location.href= "/adduser"


            })


        }

    }
}

export default Adduser;
