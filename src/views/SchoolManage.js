import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col, Modal, Form } from "react-bootstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import Select from "react-select";
import School from "./School";
import axios from "axios";
import { apiLocal } from "constant";
import SweetAlert from "react-bootstrap-sweetalert";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView"
import { FroalaEditor } from "../components/Editor/FloaraEditor.js"
const SchoolManage = () => {

    const [listSchool, setListSchool] = useState([]);
    const [detailSchool, setDetailSchool] = useState({
        name: "",
        code: "",
        logo: "",
        location: "",
        description: "",
        gallery: [],
        levelEdu: "",
    });
    const [alertWaring, setAlertWarning] = React.useState(false);
    const [confirmAlert, setConfirmAlert] = useState(false);
    const [hide, setHide] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [idSchool, setIdSchool] = useState("");
    const [idSchooEdit, setIdSchoolEdit] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const warningWithConfirmMessage = () => {
        setAlertWarning(true);
    };

    const successDelete = () => {
        setAlertWarning(false);
        setConfirmAlert(true);
        handleDeleteSchool();
    };
    const hideAlertWarn = () => {
        setAlertWarning(false);
    };
    const hideConfirm = () => {
        setConfirmAlert(false);
    }
    const handleDeleteSchool = async () => {
        console.log(idSchool);
        const res = await axios.delete(`${apiLocal}/api/schools/${idSchool}`);
    }

    const fetchListSchool = async () => {
        const res = await axios.get(`${apiLocal}/api/schools`);
        let tmp = res.data.map((item, key) => {
            return {
                id: key,
                _id: item._id,
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
                                //setShowDetails(true);
                                handleShow(true);
                                let obj = res.data.find((o) => o._id === item._id);
                                //console.log(obj)
                                //console.log(obj);
                                const convertType = ["Khác", "Công lập", "Dân lập", "Bán công"]
                                const convertLevel = ["Khác", "Đại học", "Cao đẳng", "Trung cấp"]
                                setDetailSchool({
                                    name: obj.name,
                                    code: obj.code,
                                    logo: obj.logo,
                                    location: obj.location,
                                    description: obj.description,
                                    gallery: obj.images,
                                    levelEdu: convertLevel[obj.level],
                                    typeOfSchool: convertType[obj.typeOfSchool],
                                    website: obj.website
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
                                setIdSchoolEdit(obj._id);
                                const convertType = ["Khác", "Công lập", "Dân lập", "Bán công"]
                                const convertLevel = ["Khác", "Đại học", "Cao đẳng", "Trung cấp"]
                                const majors = Array(7).fill(false);
                                obj.typeOfMajor.map((item, index) => { majors[item] = true })
                                setDetailSchool({
                                    name: obj.name,
                                    code: obj.code,
                                    logo: obj.logo,
                                    location: obj.location,
                                    description: obj.description,
                                    gallery: obj.images,
                                    levelEdu: { value: obj.level, label: convertLevel[obj.level] },
                                    typeOfSchool: { value: obj.typeOfSchool, label: convertType[obj.typeOfSchool] },
                                    typeMajors: majors,
                                    website: obj.website
                                });
                                setShowEdit(true);
                                //setShowModal(true);
                                // handleClick();
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
                                setIdSchool(obj._id);
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
        setListSchool(tmp);
    }

    const SchoolModal = ({ detailSchool }) => {
        return (
            <>
                <Modal scrollable={true} size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        School Information
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col md="12">
                                <Form className="form-horizontal">
                                    <Card>
                                        <Card.Header>
                                            <Card.Title as="h4"></Card.Title>
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

    const SchoolModalEdit = ({ detailSchool }) => {
        //console.log(detailSchool)
        const [logo, setLogo] = useState();
        const [gallery, setGallery] = useState([]);
        const [name, setName] = useState(detailSchool.name);
        const [location, setLocation] = useState(detailSchool.location);
        const [website, setWebsite] = useState(detailSchool.website);
        const [code, setCode] = useState(detailSchool.code);
        const [typeSchool, setTypeSchool] = useState(detailSchool.typeOfSchool);
        const [levelEdu, setLevelEdu] = useState(detailSchool.levelEdu);
        const [typeMajors, setTypeMajors] = useState(detailSchool.typeMajors || [true, false, false, false, false, false, false])
        const listMajors = ["Khac", "KH-KT", "XH-NV", "KT-QL", "CT-QS", "SP", "NK"]
        const [editor, setEditor] = useState(detailSchool.description);

        const handleUploadLogo = (e) => {
            if (e.target.files[0])
                setLogo(e.target.files[0]);
        }

        const handleUploadGallery = (e) => {
            if (e.target.files[0])
                setGallery([...gallery, e.target.files[0]])
        }

        const handleCheck = (index) => {
            const newValue = [...typeMajors];
            newValue[index] = !newValue[index];
            setTypeMajors(newValue);
        }
        const handleEditor = (e) => {
            //console.log(e);
            setEditor(e);
        }

        const clearAllFields = () => {
            setLogo();
            setGallery([]);
            setName("");
            setLocation("");
            setWebsite("");
            setCode("");
            setTypeSchool("");
            setLevelEdu("");
            setTypeMajors([true, false, false, false, false, false, false]);
            setEditor();
        }

        const handleSubmit = async (e) => {
            e.preventDefault();

            const tmpMajor = [];
            typeMajors.map((item, index) => {
                if (item === true)
                    tmpMajor.push(index);
            });
            const formData = new FormData();
            formData.append('logo', logo)
            formData.append('typeOfSchool', typeSchool.value)
            formData.append('level', levelEdu.value)
            formData.append('typeOfMajor', JSON.stringify(tmpMajor))
            formData.append('code', code)
            formData.append('name', name)
            formData.append('location', location)
            formData.append('website', website)
            formData.append('description', editor)
            gallery.map((item, index) => {
                formData.append('gallery', item)
            })
            const res = await axios.post(`${apiLocal}/api/schools/${idSchooEdit}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 200) {
                alert("Edit school succesful");
                //liftUp();
                //clearAllFields();
            } else {
                alert("Error");
            }
        }

        return (
            <>
                <Modal scrollable={true} size="xl" show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                        Chỉnh sửa trường
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Row>
                                <Form.Label column sm="2">
                                    Tên trường
                                </Form.Label>
                                <Col sm="7">
                                    <Form.Group>
                                        <Form.Control
                                            name="required"
                                            type="text"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        ></Form.Control>

                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Label column sm="2">
                                    Địa chỉ
                                </Form.Label>
                                <Col sm="7">
                                    <Form.Group>
                                        <Form.Control
                                            name="required"
                                            type="text"
                                            value={location}
                                            onChange={(e) => {
                                                setLocation(e.target.value)
                                            }}
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
                                            name="url"
                                            type="text"
                                            value={website}
                                            onChange={(e) => {
                                                setWebsite(e.target.value);
                                            }}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Label column sm="2">
                                    Mã trường
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Group>
                                        <Form.Control
                                            name="code"
                                            type="text"
                                            value={code}
                                            onChange={(e) => {
                                                setCode(e.target.value);
                                            }}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Label column sm="2">
                                    Thông tin trường
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Group>
                                        <Select
                                            className="react-select primary"
                                            classNamePrefix="react-select"
                                            name="singleSelect1"
                                            value={typeSchool}
                                            defaultValue={typeSchool}
                                            onChange={(value) => setTypeSchool(value)}
                                            options={[
                                                // {
                                                //     value: "",
                                                //     label: "Chon 1 gia tri",
                                                //     isDisabled: true,
                                                // },
                                                { value: 0, label: "Khác" },
                                                        { value: 1, label: "Công lập" },
                                                        { value: 2, label: "Dân lập" },
                                                        { value: 3, label: "Bán công" },
                                            ]}
                                            placeholder="Loại trường"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm="4">
                                    <Form.Group>
                                        <Select
                                            className="react-select primary"
                                            classNamePrefix="react-select"
                                            name="singleSelect2"
                                            value={levelEdu}
                                            defaultValue={levelEdu}
                                            onChange={(value) => setLevelEdu(value)}
                                            options={[
                                                // {
                                                //     value: "",
                                                //     label: "Single Option",
                                                //     isDisabled: true,
                                                // },
                                                { value: 0, label: "Khác" },
                                                        { value: 1, label: "Đại học" },
                                                        { value: 2, label: "Cao đẳng" },
                                                        { value: 3, label: "Trung cấp" },
                                            ]}
                                            placeholder="Trình độ đào tạo"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Label column sm="2">
                                </Form.Label>
                                {listMajors.map((item, index) => (
                                    <Col>
                                        <Form.Group className="pull-left">
                                            <Form.Check>
                                                <Form.Check.Label>
                                                    <Form.Check.Input
                                                        type="checkbox"
                                                        checked={typeMajors[index]}
                                                        onClick={() => handleCheck(index)}
                                                    ></Form.Check.Input>
                                                    <span className="form-check-sign"></span>
                                                    {item}
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Form.Group>
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                <Form.Label column sm="2">
                                    Logo
                                </Form.Label>
                                <Form.Group>
                                    {logo !== undefined ? <img style={{ width: 100, height: 100 }} src={URL.createObjectURL(logo)} alt="logo" /> : null}
                                    <Form.File required id="logo" onChange={handleUploadLogo} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Label column sm="2">
                                    Ảnh
                                </Form.Label>
                                <Form.Group>
                                    {gallery.length > 0 ? gallery.map((item, index) => (
                                        <div style={{ display: "inline-block" }}>
                                            <img style={{ width: 100, height: 100, margin: 5 }} src={URL.createObjectURL(item)} alt="image" />
                                        </div>
                                    )) : null}
                                    <Form.File id="gallery" onChange={handleUploadGallery} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Label column sm="2">
                                    Miêu tả
                                </Form.Label>
                                <FroalaEditor liftUp={handleEditor} defaultValue={detailSchool.description} />
                            </Row>
                            <Row>
                                <FroalaEditorView />
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="info" onClick={handleSubmit}>
                                                    Edit
                                                </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    const handleLiftUp = () => {
        fetchListSchool();
    }

    useEffect(() => {
        fetchListSchool();
    }, [])


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
            <SchoolModalEdit detailSchool={detailSchool} />
            <SchoolModal detailSchool={detailSchool} />
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
                            onClick={() => setHide(!hide)}
                        >
                            Thêm trường
                        </Button>
                    </Col>
                </Row>
                {hide === false ? <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                            </Card.Header>
                            <Card.Body>
                                <School liftUp={handleLiftUp}></School>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row> : null}
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                            </Card.Header>
                            <Card.Body>
                                <ReactTable
                                    data={listSchool}
                                    columns={[
                                        {
                                            Header: "Mã trường",
                                            accessor: "code",
                                        },
                                        {
                                            Header: "Tên trường",
                                            accessor: "name",
                                        },
                                        {
                                            Header: "Vị trí",
                                            accessor: "location",
                                        },
                                        {
                                            Header: "Website",
                                            accessor: "website",
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