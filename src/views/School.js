import React from "react";
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

// validators
const emailValidation = (value) =>
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
    );
const urlValidation = (value) => {
    let returnValue = true;
    try {
        new URL(value);
    } catch (e) {
        returnValue = false;
    } finally {
        return returnValue;
    }
    return false;
};
const equalTo = (value1, value2) => value1 === value2;
const isRequired = (value) => value !== null && value !== "" && value;
const isNumber = (value) => !isNaN(value) && value !== "";

function School() {
    const [typeRequired, setTypeRequired] = React.useState("");
    const [typeRequiredState, setTypeRequiredState] = React.useState(true);
    const [typeEmail, setTypeEmail] = React.useState("");
    const [typeEmailState, setTypeEmailState] = React.useState(true);
    const [typeNumber, setTypeNumber] = React.useState("");
    const [typeNumberState, setTypeNumberState] = React.useState(true);
    const [typeURL, setTypeURL] = React.useState("");
    const [typeURLState, setTypeURLState] = React.useState(true);
    const [typeEqualTo1, setTypeEqualTo1] = React.useState("");
    const [typeEqualTo1State, setTypeEqualTo1State] = React.useState(true);
    const [typeEqualTo2, setTypeEqualTo2] = React.useState("");
    const [typeEqualTo2State, setTypeEqualTo2State] = React.useState(true);
    const [singleSelect, setSingleSelect] = React.useState("");
    const [logo, setLogo] = React.useState();
    const [gallery, setGallery] = React.useState([])

    const handleUploadLogo = (e) => {
        if (e.target.files[0])
            setLogo(e.target.files[0]);
    }

    const handleUploadGallery = (e) => {
        if (e.target.files[0])
            setGallery([...gallery, e.target.files[0]])
    }
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Form
                            action=""
                            className="form-horizontal"
                            id="TypeValidation"
                            method=""
                        >
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">School Information</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Form.Label column sm="2">
                                            Name
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Group
                                                className={
                                                    typeRequiredState ? "has-success" : "has-error"
                                                }
                                            >
                                                <Form.Control
                                                    name="required"
                                                    type="text"
                                                    value={typeRequired}
                                                    onChange={(e) => {
                                                        setTypeRequired(e.target.value);
                                                        if (isRequired(e.target.value)) {
                                                            setTypeRequiredState(true);
                                                        } else {
                                                            setTypeRequiredState(false);
                                                        }
                                                    }}
                                                ></Form.Control>
                                                {typeRequiredState ? null : (
                                                    <label className="error">
                                                        This field is required.
                                                    </label>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Label column sm="2">
                                            Location
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Group
                                                className={
                                                    typeRequiredState ? "has-success" : "has-error"
                                                }
                                            >
                                                <Form.Control
                                                    name="required"
                                                    type="text"
                                                    value={typeRequired}
                                                    onChange={(e) => {
                                                        setTypeRequired(e.target.value);
                                                        if (isRequired(e.target.value)) {
                                                            setTypeRequiredState(true);
                                                        } else {
                                                            setTypeRequiredState(false);
                                                        }
                                                    }}
                                                ></Form.Control>
                                                {typeRequiredState ? null : (
                                                    <label className="error">
                                                        This field is required.
                                                    </label>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Label column sm="2">
                                            Website
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Group
                                                className={typeURLState ? "has-success" : "has-error"}
                                            >
                                                <Form.Control
                                                    name="url"
                                                    type="text"
                                                    value={typeURL}
                                                    onChange={(e) => {
                                                        setTypeURL(e.target.value);
                                                        if (urlValidation(e.target.value)) {
                                                            setTypeURLState(true);
                                                        } else {
                                                            setTypeURLState(false);
                                                        }
                                                    }}
                                                ></Form.Control>
                                                {typeURLState ? null : (
                                                    <label className="error">
                                                        This field is required to be a valid URL.
                                                    </label>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Form.Label column sm="2">
                                            Mã trường
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Group
                                                className={typeURLState ? "has-success" : "has-error"}
                                            >
                                                <Form.Control
                                                    name="url"
                                                    type="text"
                                                    value={typeURL}
                                                    onChange={(e) => {
                                                        setTypeURL(e.target.value);
                                                        if (urlValidation(e.target.value)) {
                                                            setTypeURLState(true);
                                                        } else {
                                                            setTypeURLState(false);
                                                        }
                                                    }}
                                                ></Form.Control>
                                                {typeURLState ? null : (
                                                    <label className="error">
                                                        This field is required to be a valid URL.
                                                    </label>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Label column sm="2">
                                            Equal to
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Group
                                                className={
                                                    typeEqualTo2State ? "has-success" : "has-error"
                                                }
                                            >
                                                <Select
                                                    className="react-select primary"
                                                    classNamePrefix="react-select"
                                                    name="singleSelect"
                                                    value={singleSelect}
                                                    onChange={(value) => setSingleSelect(value)}
                                                    options={[
                                                        {
                                                            value: "",
                                                            label: "Single Option",
                                                            isDisabled: true,
                                                        },
                                                        { value: "2", label: "Foobar" },
                                                        { value: "3", label: "Is great" },
                                                    ]}
                                                    placeholder="Loại trường"
                                                />
                                                {singleSelect ? null : (
                                                    <label className="error">
                                                        This field is required to be equal to the left one.
                                                    </label>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col sm="4">
                                            <Form.Group
                                                className={
                                                    typeEqualTo2State ? "has-success" : "has-error"
                                                }
                                            >
                                                <Select
                                                    className="react-select primary"
                                                    classNamePrefix="react-select"
                                                    name="singleSelect"
                                                    value={singleSelect}
                                                    onChange={(value) => setSingleSelect(value)}
                                                    options={[
                                                        {
                                                            value: "",
                                                            label: "Single Option",
                                                            isDisabled: true,
                                                        },
                                                        { value: "2", label: "Foobar" },
                                                        { value: "3", label: "Is great" },
                                                    ]}
                                                    placeholder="Trình độ đào tạo"
                                                />
                                                {singleSelect ? null : (
                                                    <label className="error">
                                                        This field is required to be equal to the left one.
                                                    </label>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Label column sm="2">
                                            Equal to
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Check className="checkbox-inline">
                                                <Form.Check.Label>
                                                    <Form.Check.Input
                                                        defaultValue="option1"
                                                        type="checkbox"
                                                    ></Form.Check.Input>
                                                    <span className="form-check-sign">KHTN-KT</span>
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check className="checkbox-inline">
                                                <Form.Check.Label>
                                                    <Form.Check.Input
                                                        defaultValue="option2"
                                                        type="checkbox"
                                                    ></Form.Check.Input>
                                                    <span className="form-check-sign">KHXH</span>b
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check className="checkbox-inline">
                                                <Form.Check.Label>
                                                    <Form.Check.Input
                                                        defaultValue="option3"
                                                        type="checkbox"
                                                    ></Form.Check.Input>
                                                    <span className="form-check-sign">KTTC</span>
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Col>
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
                                            Gallery
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
                                        <FroalaEditor />
                                    </Row>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button
                                        variant="info"
                                        onClick={() => {
                                            if (!typeRequiredState || !isRequired(typeRequired)) {
                                                setTypeRequiredState(false);
                                            } else {
                                                setTypeRequiredState(true);
                                            }
                                            if (!typeEmailState || !emailValidation(typeEmail)) {
                                                setTypeEmailState(false);
                                            } else {
                                                setTypeEmailState(true);
                                            }
                                            if (!typeNumberState || !isNumber(typeNumber)) {
                                                setTypeNumberState(false);
                                            } else {
                                                setTypeNumberState(true);
                                            }
                                            if (!typeURLState || !urlValidation(typeURL)) {
                                                setTypeURLState(false);
                                            } else {
                                                setTypeURLState(true);
                                            }
                                            if (
                                                !typeEqualTo2State ||
                                                !equalTo(typeEqualTo1, typeEqualTo2)
                                            ) {
                                                setTypeEqualTo2State(false);
                                            } else {
                                                setTypeEqualTo2State(true);
                                            }
                                        }}
                                    >
                                        Submit
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
