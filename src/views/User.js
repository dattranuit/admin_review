import React, { useState, Fragment } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";


const User = ({ isHidden, isEdit, data }) => {

    const [show, setShow] = useState(isHidden);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Input = ({ label, value, type }) => {
        const [typeRequiredState, setTypeRequiredState] = useState(true);
        const isRequired = (value) => value !== null && value !== "" && value;

        const handleRequired = (e) => {
            setTypeRequired(e.target.value);
            if (isRequired(e.target.value)) {
                setTypeRequiredState(true);
            } else {
                setTypeRequiredState(false);
            }
        }
        return (
            <Fragment>
                <Form.Label column sm="2">
                    {label}
                </Form.Label>
                <Form.Group
                    className={
                        typeRequiredState ? "has-success" : "has-error"
                    }
                >
                    <Form.Control
                        name="required"
                        type={type}
                        value={value}
                        onChange={(e) => {
                            handleRequired
                        }}
                    ></Form.Control>
                    {typeRequiredState ? null : (
                        <label className="error">
                            This field is required.
                        </label>
                    )}
                </Form.Group>
            </Fragment>
        );
    }

    

    return (
        <>
            <Fragment>
                <Modal show={show} onHide={handleShow}>
                    <Form onSubmit={()=>{}}>
                        <Modal.Header closeButton={handleClose}>
                            <Modal.Title>{isEdit === true ? "Add new user" : "User info"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Input label="Username" type="text"></Input>
                            <Input label="Name" type="text"></Input>
                            <Input label="Email" type="email"></Input>
                            <Input label="Password" type="password"></Input>
                            <Form.Label column sm="2">
                                Admin
                            </Form.Label>
                            <Form.Group>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch-11"
                                    className="mb-1"
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Fragment>
        </>
    );

}

export default User;