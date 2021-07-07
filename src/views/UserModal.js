import React, { useState } from "react";
// react-bootstrap components
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
    Modal
} from "react-bootstrap";

import axios from "axios";
import { apiLocal } from "../constant";

function UserModal({detailUser}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Modal scrollable={true} size="lg" show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="12">
                            <Form className="form-horizontal">
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h4">View user info</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Form.Label column sm="2">
                                                Username
                                            </Form.Label>
                                            <Col sm="7">
                                                <Form.Group>
                                                    <Form.Control
                                                    readOnly
                                                        name="required"
                                                        type="text"
                                                        value={detailUser.username}
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
                                                    readOnly
                                                        name="required"
                                                        type="text"
                                                        value={detailUser.name}
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
                                                    readOnly
                                                        name="email"
                                                        type="email"
                                                        value={detailUser.email}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Form.Label column sm="2">
                                                State
                                            </Form.Label>
                                            <Col sm="7">
                                                <Form.Group>
                                                    <Form.Control
                                                        readOnly
                                                        name="state"
                                                        type="text"
                                                        value={detailUser.state}  
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Form.Label column sm="2">
                                                Permission
                                            </Form.Label>
                                            <Col sm="7">
                                                <Form.Group>
                                                    <Form.Control
                                                        readOnly
                                                        name="state"
                                                        type="text"
                                                        value={detailUser.permission}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Form.Label column sm="2">
                                                Avatar
                                            </Form.Label>
                                            <Form.Group>
                                                {detailUser.avatar !== undefined ? <img style={{ width: 100, height: 100 }} src={detailUser.avatar} alt="avatar" /> : null}
                                            </Form.Group>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer className="text-center">
                                    </Card.Footer>
                                </Card>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserModal;
