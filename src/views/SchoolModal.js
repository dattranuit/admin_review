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
    Modal
} from "react-bootstrap";

import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView"

function SchoolModal({ detailSchool, isShow }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(isShow);
    return (
        <>
            <Modal scrollable={true} size="lg" show={false} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="12">
                            <Form className="form-horizontal">
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h4">School Information</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
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
                                                        value={detailSchool.name}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Form.Label column sm="2">
                                                Location
                                            </Form.Label>
                                            <Col sm="7">
                                                <Form.Group>
                                                    <Form.Control
                                                        readOnly
                                                        name="required"
                                                        type="text"
                                                        value={detailSchool.location}
                                                    ></Form.Control>

                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Form.Label column sm="2">
                                                Website
                                            </Form.Label>
                                            <Col sm="4">
                                                <Form.Group>
                                                    <Form.Control
                                                        readOnly
                                                        name="url"
                                                        type="text"
                                                        value={detailSchool.website}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Form.Label column sm="2">
                                                School Code
                                            </Form.Label>
                                            <Col sm="4">
                                                <Form.Group>
                                                    <Form.Control
                                                        readOnly
                                                        name="code"
                                                        type="text"
                                                        value={detailSchool.code}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Form.Label column sm="2">
                                                School Info
                                            </Form.Label>
                                            <Col sm="4">
                                                <Form.Group>
                                                    <Form.Control
                                                        readOnly
                                                        name="url"
                                                        type="text"
                                                        value={detailSchool.typeOfSchool}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col sm="4">
                                                <Form.Group>
                                                    <Form.Control
                                                        readOnly
                                                        name="url"
                                                        type="text"
                                                        value={detailSchool.levelEdu}
                                                    ></Form.Control>

                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Form.Label column sm="2">
                                                Logo
                                            </Form.Label>
                                            <Form.Group>
                                                {detailSchool.logo !== undefined ? <img style={{ width: 100, height: 100 }} src={detailSchool.logo} alt="logo" /> : null}

                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Label column sm="2">
                                                Gallery
                                            </Form.Label>
                                            <Form.Group>
                                                {detailSchool.gallery.length > 0 ? detailSchool.gallery.map((item, index) => (
                                                    <div style={{ display: "inline-block" }}>
                                                        <img style={{ width: 100, height: 100, margin: 5 }} src={item} alt="a" />
                                                    </div>
                                                )) : null}

                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Label column sm="2">
                                                Miêu tả
                                            </Form.Label>
                                            <FroalaEditorView model={detailSchool.description} />
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

export default SchoolModal;
