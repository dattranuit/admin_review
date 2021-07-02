import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// react-bootstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Notifications() {
  const [showModal, setShowModal] = React.useState(false);
  const notificationAlertRef = React.useRef(null);
  const notify = (place, type, content) => {
      console.log(1111111111111);
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
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Card>
          <Card.Body>
            <Row className="justify-content-center">
              <Col lg="3" md="3">
                <Button block onClick={() => notify("tr", "info", "Xin chao")} variant="default">
                  Top Right
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Notifications;
