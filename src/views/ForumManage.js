import React, { useEffect, useState, Fragment, useRef } from "react"
import { Button, Card, Container, Row, Col, Modal, Form } from "react-bootstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import User from "./User";
import { apiLocal } from "constant";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import SweetAlert from "react-bootstrap-sweetalert";
const ForumManage = () => {

    const [listDeletedThread, setListDeletedThread] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [listReportPost, setListReportPost] = useState([]);
    const [alertWaring, setAlertWarning] = React.useState(false);
    const [confirmAlert, setConfirmAlert] = useState(false);

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

    function extractContent(s) {
        var span = document.createElement('span');
        span.innerHTML = s;
        return span.textContent || span.innerText;
    };

    const fetchListPost = async () => {
        const res = await axios.get(`${apiLocal}/api/posts/report`);
        let tmp = res.data.map((item, key) => {
            return {
                id: item._id,
                reportBy: item.reported.reportedBy,
                threadTitle: item.inThread.title,
                content: extractContent(item.content),
                reason: item.reported.reason,
                actions: (
                    // we've added some custom button actions
                    <div className="actions-right">
                        {/* use this button to add a like kind of action */}
                        {/* use this button to add a edit kind of action */}
                        <Button
                            onClick={() => {
                                let obj = res.data.find((o) => o.id === key);
                                warningWithConfirmMessage()

                            }}
                            variant="warning"
                            size="sm"
                            className="text-warning btn-link edit"
                        >
                            <i className="fa fa-edit" />
                        </Button>{" "}
                        {/* use this button to remove the data row */}
                    </div>
                ),
            };
        })
        setListReportPost(tmp);
    }
    const fetchListThread = async () => {
        const res = await axios.get(`${apiLocal}/api/threads/deleted`);
        let tmp = res.data.map((item, key) => {
            return {
                id: item._id,
                threadTitle: item.title,
                createdBy: item.byUser.username,
                category: item.category.category,
                replies: item.posts.length,
                actions: (
                    // we've added some custom button actions
                    <div className="actions-right">
                        {/* use this button to add a edit kind of action */}
                        <Button
                            onClick={() => {
                                let obj = res.data.find((o) => o.id === item._id);
                                warningWithConfirmMessage();

                            }}
                            variant="warning"
                            size="sm"
                            className="text-warning btn-link edit"
                        >
                            <i className="fa fa-edit" />
                        </Button>{" "}
                    </div>
                ),
            };
        })
        setListDeletedThread(tmp);
    }
    useEffect(() => {
        fetchListThread();
        fetchListPost();
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
                You will not be able to recover this school.
            </SweetAlert>}
            {confirmAlert && <SweetAlert
                success
                style={{ display: "block", marginTop: "100px" }}
                title="Deleted!"
                onConfirm={() => hideConfirm()}
                onCancel={() => hideConfirm()}
                confirmBtnBsStyle="info"
            >
                School has been deleted.
            </SweetAlert>}
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
                <Row>
                    <Col md="12">
                        <Card hidden={false}>
                            <Card.Header>
                                <Card.Title as="h4">Deleted Thread</Card.Title>
                                <p className="card-category">
                                    Created using Montserrat Font Family
                                </p>
                            </Card.Header>
                            <Card.Body>
                                <ReactTable
                                    data={listDeletedThread}
                                    columns={[
                                        {
                                            Header: "Created By",
                                            accessor: "createdBy",
                                        },
                                        {
                                            Header: "Thread title",
                                            accessor: "threadTitle",
                                        },
                                        {
                                            Header: "Category",
                                            accessor: "category",
                                        },
                                        {
                                            Header: "Replies",
                                            accessor: "replies",
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
                <Row>
                    <Col md="12">
                        <Card hidden={false}>
                            <Card.Header>
                                <Card.Title as="h4">Post Reported</Card.Title>
                                <p className="card-category">
                                    Created using Montserrat Font Family
                                </p>
                            </Card.Header>
                            <Card.Body>
                                <ReactTable
                                    data={listReportPost}
                                    columns={[
                                        {
                                            Header: "ReportBy",
                                            accessor: "reportBy",
                                        },
                                        {
                                            Header: "Thread Title",
                                            accessor: "threadTitle",
                                        },
                                        {
                                            Header: "Post content",
                                            accessor: "content",
                                        },
                                        {
                                            Header: "Reason",
                                            accessor: "reason",
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

export default ForumManage;