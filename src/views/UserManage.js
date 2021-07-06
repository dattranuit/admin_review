import React, { useEffect, useState, Fragment, useRef } from "react"
import { Button, Card, Container, Row, Col, Modal, Form } from "react-bootstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import User from "./User";
import { apiLocal } from "constant";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import UserModal from "./UserModal";
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
    const [isShow, setIsShow] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);


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
                                console.log(obj);
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
                                let obj = res.data.find((o) => o.id === key);
                                

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

    return (
        <>
            <UserModal detailUser={detailUser} isShow={isShowModal}/>
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