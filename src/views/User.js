import React, { useState , useRef} from "react";

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
import NotificationAlert from "react-notification-alert"

const User = () => {

    const [username, setUserName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const clearAllFields = () =>{
        setUserName("");
        setName("");
        setEmail("");
        setPassword("");
    }
    const notificationAlertRef = useRef(null);
    const notify = (e, place, type, content) => {
        e.preventDefault();
        // type = "primary";
        // type = "success";
        // type = "danger";
        // type = "warning";
        // type = "info";
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>
                        {content}
                    </div>
                </div>
            ),
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 3,
        };
        notificationAlertRef.current.notificationAlert(options);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${apiLocal}/api/users/register`,{
            username: username,
            email: email,
            name: name,
            password: password
        });
        if (res.data.msg === "Success"){
            notify(e, "tr", "success", "Create account successful");
            clearAllFields();
        } else {
            notify(e, "tr", "warning", res.data.msg);
        }
    }

    return (
        <>
        <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Form className="form-horizontal">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Thêm người dùng mới</Card.Title>
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
                                            Tên
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
                                            Mật khẩu
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
                                        Thêm
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
