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
} from "react-bootstrap";

import { FroalaEditor } from "../components/Editor/FloaraEditor.js"
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView"
import axios from "axios";
import {apiLocal} from "../constant";

function School({liftUp}) {
    const [logo, setLogo] = useState();
    const [gallery, setGallery] = useState([]);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [code, setCode] = useState("");
    const [typeSchool, setTypeSchool] = useState("");
    const [levelEdu, setLevelEdu] = useState("");
    const [typeMajors, setTypeMajors] = useState([true, false, false, false, false, false, false])
    const listMajors = ["Khác", "Khoa học - Kỹ thuật", "Xã hội - Nhân văn", "Kinh tế-Quản lý", "Chính trị -Quân sự", "Sư phạm", "Năng khiếu"]
    const [editor, setEditor] = useState();

    const handleUploadLogo = (e) => {
        if (e.target.files[0])
            setLogo(e.target.files[0]);
    }

    const handleUploadGallery = (e) => {
        if (e.target.files[0])
            setGallery([...gallery, e.target.files[0]])
    }

    const handleCheck = (index) =>{
        const newValue = [...typeMajors];
        newValue[index] = !newValue[index];
        setTypeMajors(newValue);
    }
    const handleEditor = (e) =>{
        setEditor(e);
    }

    const clearAllFields = () =>{
        setLogo();
        setGallery([]);
        setName("");
        setLocation("");
        setWebsite("");
        setCode("");
        setTypeSchool("");
        setLevelEdu("");
        setTypeMajors([true, false, false, false, false, false, false]);
        setEditor("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const tmpMajor = [];
        typeMajors.map((item, index) => {
            if (item === true)
                tmpMajor.push(index);
        });
        //console.log(tmpMajor);
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
        gallery.map((item, index) =>{
            formData.append('gallery', item)
        })
        const res = await axios.post(`${apiLocal}/api/schools`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (res.status === 200){
            alert("Create school succesful");
            liftUp();
            clearAllFields();
        } else {
            alert("Error");
        }
    }


    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Form className="form-horizontal">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Thêm trường mới</Card.Title>
                                </Card.Header>
                                <Card.Body>
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
                                            Vị trí
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
                                        <Col sm="7">
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
                                        <Col sm="7">
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
                                                    name="singleSelect"
                                                    value={typeSchool}
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
                                                    name="singleSelect"
                                                    value={levelEdu}
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
                                                    <img style={{ width: 100, height: 100, margin: 5 }} src={URL.createObjectURL(item)} alt="a" />
                                                </div>
                                            )) : null}
                                            <Form.File id="gallery" onChange={handleUploadGallery} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Label column sm="2">
                                            Miêu tả
                                        </Form.Label>
                                        <FroalaEditor liftUp={handleEditor}/>
                                    </Row>
                                    <Row>
                                        <FroalaEditorView/>
                                    </Row>
                                    
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button variant="info" onClick={handleSubmit}>
                                        Thêm
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default School;
