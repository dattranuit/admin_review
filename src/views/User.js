import React, { useState } from "react";
import Select from "react-select";
// react-bootstrap components
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
} from "react-bootstrap";

import axios from "axios";
import { apiLocal } from "../constant";
import { data } from "jquery";

function User() {

    const [username, setUserName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${apiLocal}/api/users/register`,{
            username: username,
            email: email,
            name: name,
            password: password
        });
        console.log(res.data)
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Form className="form-horizontal">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Add new user</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Form.Label column sm="2">
                                            Username
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Group>
                                                <Form.Control
                                                    name="required"
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => {
                                                        setUserName(e.target.value);
                                                    }}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Label column sm="2">
                                            Name
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Group>
                                                <Form.Control
                                                    name="required"
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => {
                                                        setName(e.target.value)
                                                    }}
                                                ></Form.Control>

                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Label column sm="2">
                                            Email
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Group>
                                                <Form.Control
                                                    name="url"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Label column sm="2">
                                            Password
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Group>
                                                <Form.Control
                                                    name="url"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                    }}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button variant="info" onClick={handleSubmit}>
                                        Add
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default User;
