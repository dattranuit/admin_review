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
import { FroalaEditor } from "../components/Editor/FloaraEditor.js"
const SchoolModalEdit = ({ detailSchool }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [logo, setLogo] = useState(detailSchool.logo);
    const [gallery, setGallery] = useState(detailSchool.gallery);
    const [name, setName] = useState(detailSchool.name);
    const [location, setLocation] = useState(detailSchool.gallery);
    const [website, setWebsite] = useState(detailSchool.website);
    const [code, setCode] = useState(detailSchool.code);
    const [typeSchool, setTypeSchool] = useState(detailSchool.typeSchool);
    const [levelEdu, setLevelEdu] = useState(detailSchool.levelEdu);
    const [typeMajors, setTypeMajors] = useState(detailSchool.typeMajors || [true, false, false, false, false, false, false])
    const listMajors = ["Khac", "KH-KT", "XH-NV", "KT-QL", "CT-QS", "SP", "NK"]
    const [editor, setEditor] = useState();

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
        const res = await axios.post(`${apiLocal}/api/schools`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (res.status === 200) {
            alert("Create school succesful");
            liftUp();
            clearAllFields();
        } else {
            alert("Error");
        }
    }

    return (
        <>
            <Modal scrollable={true} size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
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
                                        setName(e.target.value);
                                    }}
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
                            School Code
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
                            School Info
                        </Form.Label>
                        <Col sm="4">
                            <Form.Group>
                                <Select
                                    className="react-select primary"
                                    classNamePrefix="react-select"
                                    name="singleSelect"
                                    value={typeSchool}
                                    onChange={(value) => setTypeSchool(value)}
                                    options={[
                                        // {
                                        //     value: "",
                                        //     label: "Chon 1 gia tri",
                                        //     isDisabled: true,
                                        // },
                                        { value: 0, label: "Khac" },
                                        { value: 1, label: "Cong lap" },
                                        { value: 2, label: "Dan lap" },
                                        { value: 3, label: "Ban cong" },
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
                                    name="singleSelect"
                                    value={levelEdu}
                                    onChange={(value) => setLevelEdu(value)}
                                    options={[
                                        // {
                                        //     value: "",
                                        //     label: "Single Option",
                                        //     isDisabled: true,
                                        // },
                                        { value: 0, label: "Khac" },
                                        { value: 1, label: "Dai hoc" },
                                        { value: 2, label: "Cao dang" },
                                        { value: 3, label: "Trung cap" },
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
                            {logo !== undefined ? <img style={{ width: 100, height: 100 }} src={logo} alt="logo" /> : null}
                            <Form.File required id="logo" onChange={handleUploadLogo} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">
                            Gallery
                        </Form.Label>
                        <Form.Group>
                            {gallery.length > 0 ? gallery.map((item, index) => (
                                <div style={{ display: "inline-block" }}>
                                    <img style={{ width: 100, height: 100, margin: 5 }} src={item} alt="image" />
                                </div>
                            )) : null}
                            <Form.File id="gallery" onChange={handleUploadGallery} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">
                            Miêu tả
                        </Form.Label>
                        <FroalaEditor liftUp={handleEditor} />
                    </Row>
                    <Row>
                        <FroalaEditorView />
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SchoolModalEdit;
