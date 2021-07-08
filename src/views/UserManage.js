import React, { useEffect, useState, Fragment, useRef } from "react"
import { Button, Card, Container, Row, Col, Modal, Form } from "react-bootstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import User from "./User";
import { apiLocal } from "constant";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import SweetAlert from "react-bootstrap-sweetalert";
const UserManage = () => {

    const [listUser, setListUser] = useState([]);
    const [userData, setUserData] = useState({});
    const [detailUser, setDetailUser] = useState({
        _id: "",
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
    const [stateUser, setStateUser] = useState(false);
    const [userId, setUserId] = useState("");

    const warningWithConfirmMessage = () => {
        setAlertWarning(true);
    };

    const successDelete = async () => {
        setAlertWarning(false);
        setConfirmAlert(true);
        console.log(stateUser);
        if(stateUser === true){
            handleUnBan(userId);
        }else{
            handleBan(userId);
        }
        
    };
    const hideAlertWarn = () => {
        setAlertWarning(false);
    };
    const hideConfirm = () => {
        setConfirmAlert(false);
    }

    const handleBan = async (idUser) =>{
        console.log(userData);
        const res = await axios.patch(`${apiLocal}/api/users/banned`, {
            idAdmin:userData._id, 
            idUser: idUser
        });
    }
    const handleUnBan = async (idUser) =>{
        const res = await axios.patch(`${apiLocal}/api/users/unbanned`, {
            idAdmin:userData._id, 
            idUser: idUser
        });
    }

    const fetchMe = async () =>{
        const res = await axios.get(`${apiLocal}/api/users/me`, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        });
        if(res.data.username) {
            setUserData(res.data);
        }
    }
    const fetchListUser = async () => {
        const res = await axios.get(`${apiLocal}/api/users`);
        let tmp = res.data.map((item, key) => {
            return {
                _id: item._id,
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
                                let obj = res.data.find((o) => o._id === item._id);
                                handleShowEdit(true);
                                setDetailUser({
                                    username: obj.username,
                                    name: obj.name,
                                    email: obj.email,
                                    _id: obj._id
                                    // avatar: obj.avatar,
                                    // permission: obj.permission === 1 ? "Admin" : "Member",
                                    // state: obj.banned === false ? "Active" : "Banned",
                                    // createdAt: obj.createdAt,
                                });

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
                                let obj = res.data.find((o) => o._id === item._id);
                                setUserId(obj._id)
                                warningWithConfirmMessage();
                                if(obj.banned === false){
                                    setStateUser(false);
                                    //handleBan(obj._id);
                                } else {
                                    setStateUser(true);
                                    //handleUnBan(obj._id)
                                }
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
        const [name, setName] = useState(detailUser.name);
        const [email, setEmail] = useState(detailUser.email);
        const [password, setPassword] = useState("");

        const handleSubmit = async (e) => {
            e.preventDefault();
            const res = await axios.post(`${apiLocal}/api/users/${detailUser._id}/updateuser`,{
                email: email,
                name: name,
                password: password
            });
            if(res.data.code === 1){
                notify(e, "tr", "success", "Chỉnh sửa người dùng thành công!")
                
            } else {
                notify(e, "tr", "Waring", res.data.msg);
            }
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
        fetchMe();
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
                confirmBtnText={stateUser === false?"Yes, ban it!":"Yes, unban it!"}
                cancelBtnText="Cancel"
                showCancel
            >
            </SweetAlert>}
            {confirmAlert && <SweetAlert
                success
                style={{ display: "block", marginTop: "100px" }}
                title={stateUser === false?"Banned":"Unbanned"}
                onConfirm={() => hideConfirm()}
                onCancel={() => hideConfirm()}
                confirmBtnBsStyle="info"
            >
                {stateUser === false?"User has been banned!":"User has been unbanned!"}
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
                            Thêm người dùng
                        </Button>
                    </Col>
                </Row>
                {isShow === false ? <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
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
                                            Header: "Tên",
                                            accessor: "name",
                                        },
                                        {
                                            Header: "Trạng thái",
                                            accessor: "banned",
                                        },
                                        {
                                            Header: "Quyền hạn",
                                            accessor: "permission",
                                        },
                                        {
                                            Header: "Hành động",
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