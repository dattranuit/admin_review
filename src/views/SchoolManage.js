import React, { useState, useEffect } from "react";

import { Button, Card, Container, Row, Col, } from "react-bootstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import School from "./School";
import axios from "axios";
import { apiLocal } from "constant";
const SchoolManage = () => {

    const [listSchool, setListSchool] = useState([]);

    const fetchListSchool = async () =>{
        const res = await axios.get(`${apiLocal}/api/schools`);
        let tmp = res.data.map((item, key) => {
            return {
                id: key,
                code: item.code,
                name: item.name,
                location: item.location,
                website: item.website,
                actions: (
                    // we've added some custom button actions
                    <div className="actions-right">
                        {/* use this button to add a like kind of action */}
                        <Button
                            onClick={() => {
                                let obj = res.data.find((o) => o.id === key);
                                alert(
                                    "You've clicked LIKE button on \n{ \nName: " +
                                    obj.username +
                                    ", \nposition: " +
                                    obj.name +
                                    ", \noffice: " +
                                    obj.createAt +
                                    ", \nage: " +
                                    obj.permission +
                                    "\n}."
                                );
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
                                alert(
                                    "You've clicked LIKE button on \n{ \nName: " +
                                    obj.username +
                                    ", \nposition: " +
                                    obj.name +
                                    ", \noffice: " +
                                    obj.createAt +
                                    ", \nage: " +
                                    obj.permission +
                                    "\n}."
                                );
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
        setListSchool(tmp);
    }

    useEffect(()=>{
        fetchListSchool();
    },[])

    const [hide, setHide] = useState(false);
    return (
        <>
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
                            onClick={() => setHide(false)}
                        >
                            New School
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                            <Card.Title as="h4">Light Bootstrap Table Heading</Card.Title>
                                <p className="card-category">
                                    Created using Montserrat Font Family
                                </p>
                            </Card.Header>
                            <Card.Body>
                               <School></School>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card hidden={hide}>
                            <Card.Header>
                                <Card.Title as="h4">Light Bootstrap Table Heading</Card.Title>
                                <p className="card-category">
                                    Created using Montserrat Font Family
                                </p>
                            </Card.Header>
                            <Card.Body>
                                <ReactTable
                                    data={listSchool}
                                    columns={[
                                        {
                                            Header: "Code",
                                            accessor: "code",
                                        },
                                        {
                                            Header: "Name",
                                            accessor: "name",
                                        },
                                        {
                                            Header: "Location",
                                            accessor: "location",
                                        },
                                        {
                                            Header: "Website",
                                            accessor: "website",
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
                                    className="-striped -highlight primary-pagination"
                                />
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SchoolManage;