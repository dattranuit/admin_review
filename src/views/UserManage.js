import React, { useEffect, useState, Fragment, useRef } from "react"
import { Button, Card, Container, Row, Col, Modal, Form } from "react-bootstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import User from "./User";
import { apiLocal } from "constant";
import axios from "axios";
import NotificationAlert from "react-notification-alert";

const UserManage = () => {

    const [listUser, setListUser] = useState([]);
    const [avatar, setAvatar] = useState("https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-graphic-default-avatar-png-image_2813121.jpg");

    // const [userName1, setUserName1] = useState("");
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("")

    const [crudUser, setCrudUser] = useState("read");
    const [isShow, setIsShow] = useState(false);
    var username ="";
    var name = "";
    var email = "";
    var password = "";


    const bindData = (username, name, email, avatar) => {
        username = username;
        name = name;
        email = email;
        setAvatar(avatar);
    }

    const clearAllField = () => {

        setAvatar("https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-graphic-default-avatar-png-image_2813121.jpg");
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
                                setCrudUser("read");
                                setIsShow(true);
                                //console.log(obj)
                                bindData(obj.username, obj.name, obj.email, obj.avatar)
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
                                let obj = res.data.find((o) => o.id === key);
                                setCrudUser("update");
                                setIsShow(true);

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
                                var newData = res.data;
                                newData.find((o, i) => {
                                    if (o.id === key) {
                                        // here you should add some custom code so you can delete the data
                                        // from this component and from your server as well
                                        newData.splice(i, 1);
                                        return true;
                                    }
                                    return false;
                                });
                                setData([...newData]);
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
    useEffect(() => {
        fetchListUser();
    }, [])

    const handleUserName = (e) => {
        //setUserName1(e);
        //console.log(e)
        username = e;
        //console.log(tmp)
    }
    const handleName = (e) => {
        //setName(e);
        name = e;
        //console.log(tmp2)
    }
    const handleEmail = (e) => {
        //setEmail(e);
        email = e;
    }
    const handlePassword = (e) => {
        //setPassword(e);
        password = e;
    }


    const Input = ({ label, value, type, readOnly, hidden, liftUp }) => {
        const emailValidation = (value) =>
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                value
            );
        const minLength = (value, length) => value.length >= length;
        const maxLength = (value, length) => value.length <= length && value !== "";
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
        const handleChange = (e) => {
            liftUp(e.target.value);
        }
        return (hidden === false ?
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
                        value={value}
                        readOnly={readOnly}
                        name="required"
                        type={type}
                        onChange={(e) => {
                            handleRequired
                            handleChange(e)
                        }}
                    ></Form.Control>
                    {typeRequiredState ? null : (
                        <label className="error">
                            This field is required.
                        </label>
                    )}
                </Form.Group>
            </Fragment>
            : null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // const res = axios.post(`${apiLocal}/api/users/`,{

        // }, headers={})
        console.log(username);

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

    return (
        <>
            <Fragment>
                <Modal show={isShow} onHide={() => setIsShow(false)}>
                    <Form>
                        <Modal.Header closeButton={() => setIsShow(false)}>
                            <Modal.Title>{crudUser === "create" ? "Add new user" :
                                crudUser === "update" ? "Edit user" : "User info"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Input hidden={false} readOnly={crudUser === "create" ? false : true}
                                label="Username" type="text" liftUp={handleUserName}></Input>

                            <Input hidden={false} readOnly={crudUser === "create" || crudUser === "update"? false : true}
                            label="Name" type="text" liftUp={handleName}></Input>

                        <Input hidden={false} readOnly={crudUser === "create" || crudUser === "update" ? false : true}
                            label="Email" type="email" liftUp={handleEmail} ></Input>

                        <Input hidden={crudUser === "read" ? true : false}
                            label="Password" type="password" liftUp={handlePassword}></Input>

                            {crudUser === "read" ? <Fragment>
                                <Form.Label column sm="2">
                                    Avatar
                                </Form.Label>
                                <Form.Group>
                                    {avatar !== undefined ? <img style={{ width: 100, height: 100 }}
                                        src={avatar} alt="avatar" /> : null}
                                </Form.Group>
                            </Fragment> : null}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setIsShow(false)}>
                                Close
                            </Button>
                            {/* hidden={crudUser === "read" ? true : false} */}
                            <Button
                                variant="primary" onClick={(e) => { handleSubmit(e); notify(e, "tr", "info", "Hi") }}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Fragment>
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            {console.log('ren')}
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
                            onClick={() => { setIsShow(!isShow); setCrudUser("create") }}
                        >
                            New User
                        </Button>
                    </Col>
                </Row>
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