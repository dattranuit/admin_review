import React, { useRef } from "react";
// react-bootstrap components
import {
    Button,
    Card,
    Form,
    Container,
    Col,
} from "react-bootstrap";
import axios from "axios";
import { apiLocal } from "../constant";
import NotificationAlert from "react-notification-alert";
import LoginNavbar from "../components/Navbars/LoginNavbar";
import LoginFooter from "../components/Footer/LoginFooter";
import {useHistory} from "react-router-dom";
function LoginPage() {
    const [cardClasses, setCardClasses] = React.useState("card-hidden");
    const refEmail = useRef();
    const refPassword = useRef();
    const history = useHistory();
    React.useEffect(() => {
        setTimeout(function () {
            setCardClasses("");
        }, 1000);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await axios.post(`${apiLocal}/api/users/login`, {
            email: refEmail.current.value,
            password: refPassword.current.value
        });
        console.log(res.headers)
        if (res.headers['x-access-token']) {
            if(res.data.data.permission === 1){
                localStorage.setItem('x-access-token', res.headers['x-access-token']);
                history.push("/admin")
            } else {
                notify(e, "tr", "info", "Bạn không đủ quyền để truy cập.");
            }
        } else {
            notify(e, "tr", "warning", "Đăng nhập thất bại");
        }
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
        <div className="wrapper wrapper-full-page">
            {/* Navbar */}
            <LoginNavbar />
            {/* End Navbar */}
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <div
                className="full-page section-image"
                data-color="black"
                data-image={require("assets/img/full-screen-image-2.jpg").default}
            >
                <div className="content d-flex align-items-center p-0">
                    <Container>
                        <Col className="mx-auto" lg="4" md="8">
                            <Form action="" className="form" method="">
                                <Card className={"card-login " + cardClasses}>
                                    <Card.Header>
                                        <h3 className="header text-center">Login</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Body>
                                            <Form.Group>
                                                <label>Email address</label>
                                                <Form.Control
                                                    ref={refEmail}
                                                    placeholder="Enter email"
                                                    type="email"
                                                ></Form.Control>
                                            </Form.Group>
                                            <Form.Group>
                                                <label>Password</label>
                                                <Form.Control
                                                    ref={refPassword}
                                                    placeholder="Password"
                                                    type="password"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card.Body>
                                    <Card.Footer className="ml-auto mr-auto">
                                        <Button className="btn-wd" variant="warning" onClick={handleSubmit}>
                                            Login
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Form>
                        </Col>
                    </Container>
                </div>
                <div
                    className="full-page-background"
                    style={{
                        backgroundImage:
                            "url(" +
                            require("assets/img/full-screen-image-2.jpg").default +
                            ")",
                    }}
                ></div>
            </div>
            <LoginFooter />
        </div>
    );
}

export default LoginPage;

