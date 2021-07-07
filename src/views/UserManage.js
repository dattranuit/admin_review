import React, { useEffect, useState, Fragment, useRef } from "react"
import { Button, Card, Container, Row, Col, Modal, Form } from "react-bootstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import User from "./User";
import { apiLocal } from "constant";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import UserModal from "./UserModal";
import SweetAlert from "react-bootstrap-sweetalert";
const UserManage = () => {

    const [listUser, setListUser] = useState([]);
    const [detailUser, setDetailUser] = useState({
        username: "",
        name: "",
        email: "",
        avatar: "",
        permission: "",
        banned: "",
        createdAt: "",
    });
    const [alertWaring, setAlertWarning] = React.useState(false);
    const [confirmAlert, setConfirmAlert] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const warningWithConfirmMessage = () => {
        setAlertWarning(true);
    };

    const successDelete = () => {
        setAlertWarning(false);
        setConfirmAlert(true);
    };
    const hideAlertWarn = () => {
        setAlertWarning(false);
    };
    const hideConfirm = () => {
        setConfirmAlert(false);
    }


    const fetchListUser = async () => {
        const res = await axios.get(`${apiLocal}/api/users`);
        let tmp = res.data.map((item, key) => {
            return {
                id: item._id,
                username: item.username,
                name: item.name,
                banned: item.banned === true ? "Banned" : "Active",
                permission: item.permission === 1 ? "Admin" : "Member",
                actions: (
                    // we've added some custom button actions
                    <div className="actions-right">
                        {/* use this button to add a like kind of action */}
                        <Button
                            onClick={() => {
                                let obj = res.data.find((o) => o._id === item._id);
                                handleShowModal(true);
                                setDetailUser({
                                    username: obj.username,
                                    name: obj.name,
                                    email: obj.email,
                                    avatar: obj.avatar,
                                    permission: obj.permission === 1 ? "Admin" : "Member",
                                    state: obj.banned === false ? "Active" : "Banned",
                                    createdAt: obj.createdAt,
                                });
                            }}
                            variant="info"
                            size="sm"
                            className="text-info btn-link like"
                        >
                            <i className="fa fa-eye" />
                        </Button>{" "}
                        {/* use this button to add a edit kind of action */}
                        <Button
                            onClick={() => {
                                let obj = res.data.find((o) => o.id === item._id);
                                handleShowEdit(true);

                            }}
                            variant="warning"
                            size="sm"
                            className="text-warning btn-link edit"
                        >
                            <i className="fa fa-edit" />
                        </Button>{" "}
                        {/* use this button to remove the data row */}
                        <Button
                            onClick={() => {
                                let obj = res.data.find((o) => o.id === item._id);
                                warningWithConfirmMessage();
                            }}
                            variant="danger"
                            size="sm"
                            className="btn-link remove text-danger"
                        >
                            <i className="fa fa-times" />
                        </Button>{" "}
                    </div>
                ),
            };
        })
        setListUser(tmp);
    }
    const UserEdit = ({ detailUser }) => {

        //const [username, setUserName] = useState("");
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const handleSubmit = async (e) => {
            e.preventDefault();
            // const res = await axios.post(`${apiLocal}/api/users/register`,{
            //     username: username,
            //     email: email,
            //     name: name,
            //     password: password
            // });
        }

        return (
            <>
                <Modal scrollable={true} size="lg" show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Row>
                                <Col md="12">
                                    <Form className="form-horizontal">
                                        <Card>
                                            <Card.Header>
                                                <Card.Title as="h4">Edit user</Card.Title>
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
                                                                name="required"
                                                                type="text"
                                                                value={detailUser.name}
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
                                                                value={detailUser.email}
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
                                                    Edit
                                                </Button>
                                            </Card.Footer>
                                        </Card>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>

                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    useEffect(() => {
        fetchListUser();
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        notify(e, "tr", "info", "Hi")
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

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const UserModal = ({ detailUser }) => {
        return (
            <>
                <Modal scrollable={true} size="lg" show={showModal} onHide={handleCloseModal}>
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

    return (
        <>
            {alertWaring && <SweetAlert
                warning
                style={{ display: "block", marginTop: "100px" }}
                title="Are you sure?"
                onConfirm={() => successDelete()}
                onCancel={() => hideAlertWarn()}
                confirmBtnBsStyle="info"
                cancelBtnBsStyle="danger"
                confirmBtnText="Yes, delete it!"
                cancelBtnText="Cancel"
                showCancel
            >
                You will not be able to recover this user.
            </SweetAlert>}
            {confirmAlert && <SweetAlert
                success
                style={{ display: "block", marginTop: "100px" }}
                title="Deleted!"
                onConfirm={() => hideConfirm()}
                onCancel={() => hideConfirm()}
                confirmBtnBsStyle="info"
            >
                User has been deleted.
            </SweetAlert>}
            <UserModal detailUser={detailUser} />
            <UserEdit detailUser={detailUser} />
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Container fluid>
                <Row>
                    <Col />
                    <Col />
                    <Col />
                    <Col>
                        <Button
                            style={{ float: "right", marginBottom: 10 }}
                            className="btn-fill pull-right"
                            type="submit"
                            variant="info"
                            onClick={() => { setIsShow(!isShow); }}
                        >
                            New User
                        </Button>
                    </Col>
                </Row>
                {isShow === false ? <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Light Bootstrap Table Heading</Card.Title>
                                <p className="card-category">
                                    Created using Montserrat Font Family
                                </p>
                            </Card.Header>
                            <Card.Body>
                                <User></User>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row> : null}
                <Row>
                    <Col md="12">
                        <Card hidden={false}>
                            <Card.Header>
                                <Card.Title as="h4">Light Bootstrap Table Heading</Card.Title>
                                <p className="card-category">
                                    Created using Montserrat Font Family
                                </p>
                            </Card.Header>
                            <Card.Body>
                                <ReactTable
                                    data={listUser}
                                    columns={[
                                        {
                                            Header: "Username",
                                            accessor: "username",
                                        },
                                        {
                                            Header: "Name",
                                            accessor: "name",
                                        },
                                        {
                                            Header: "State",
                                            accessor: "banned",
                                        },
                                        {
                                            Header: "Permission",
                                            accessor: "permission",
                                        },
                                        {
                                            Header: "Actions",
                                            accessor: "actions",
                                            sortable: false,
                                            filterable: false,
                                        },
                                    ]}
                                    /*
                                      You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
                                    */
                                    className="-striped -highlight info-pagination"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );

}

export default UserManage;