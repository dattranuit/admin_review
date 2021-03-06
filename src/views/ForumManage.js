import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
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

  const [alertWaringPost, setAlertWarningPost] = React.useState(false);
  const [confirmAlertPost, setConfirmAlertPost] = useState(false);

  const [stateThread, setStateThread] = useState(false);
  const [statePostChoose, setStatePostChoose] = useState(false);

  const [idThread, setIdThread] = useState("");
  const [idPost, setIdPost] = useState("");

  const warningWithConfirmMessage = () => {
    setAlertWarning(true);
  };

  const successDelete = async () => {
    setAlertWarning(false);
    setConfirmAlert(true);
    const res = await axios.post(
      `${apiLocal}/api/threads/${idThread}/undeleted`,
      {},
      {
        headers: { "x-access-token": localStorage.getItem("x-access-token") },
      }
    );
  };
  const hideAlertWarn = () => {
    setAlertWarning(false);
  };
  const hideConfirm = () => {
    setConfirmAlert(false);
  };

  // For post
  const warningWithConfirmMessagePost = () => {
    setAlertWarningPost(true);
  };

  const successDeletePost = async () => {
    setAlertWarningPost(false);
    setConfirmAlertPost(true);
    if (statePostChoose === true) {
      const res = await axios.delete(`${apiLocal}/api/posts/${idPost}`, {
        headers: { "x-access-token": localStorage.getItem("x-access-token") },
      });
    } else {
      const res = await axios.post(
        `${apiLocal}/api/posts/${idPost}/decline`,
        {},
        {
          headers: { "x-access-token": localStorage.getItem("x-access-token") },
        }
      );
    }
  };
  const hideAlertWarnPost = () => {
    setAlertWarningPost(false);
  };
  const hideConfirmPost = () => {
    setConfirmAlertPost(false);
  };

  function extractContent(s) {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }

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
                let obj = res.data.find((o) => o._id === item._id);
                setStatePostChoose(true);
                warningWithConfirmMessagePost();
                setIdPost(obj._id);
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
                setStatePostChoose(false);
                warningWithConfirmMessagePost();
                setIdPost(obj._id);
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
    });
    setListReportPost(tmp);
  };
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
                let obj = res.data.find((o) => o._id === item._id);
                //console.log(obj._id)
                setIdThread(obj._id);
                warningWithConfirmMessage();
                setStateThread(true);
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
    });
    setListDeletedThread(tmp);
  };
  useEffect(() => {
    fetchListThread();
    fetchListPost();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    notify(e, "tr", "info", "Hi");
  };
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
          <div>{content}</div>
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
      {alertWaring && (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "100px" }}
          title="Kh??i ph???c thread?"
          onConfirm={() => successDelete()}
          onCancel={() => hideAlertWarn()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
          confirmBtnText="Kh??i ph???c"
          cancelBtnText="H???y"
          showCancel
        ></SweetAlert>
      )}
      {confirmAlert && (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "100px" }}
          title="Ho??n th??nh"
          onConfirm={() => hideConfirm()}
          onCancel={() => hideConfirm()}
          confirmBtnBsStyle="info"
        >
          Thread ???? ???????c kh??i ph???c
        </SweetAlert>
      )}

      {alertWaringPost && (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "100px" }}
          title={
            statePostChoose === true ? "Xo?? post n??y?" : "X??a b??o c??o n??y?"
          }
          onConfirm={() => successDeletePost()}
          onCancel={() => hideAlertWarnPost()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
          confirmBtnText="X??a"
          cancelBtnText="H???y"
          showCancel
        ></SweetAlert>
      )}
      {confirmAlertPost && (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "100px" }}
          title="Ho??n th??nh"
          onConfirm={() => hideConfirmPost()}
          onCancel={() => hideConfirmPost()}
          confirmBtnBsStyle="info"
        >
          {statePostChoose === true ? "Post ???? ???????c x??a." : "???? x??a b??o c??o."}
        </SweetAlert>
      )}

      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Row>
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
        </Row>
        <Row>
          <Col md="12">
            <Card hidden={false}>
              <Card.Header>
                <Card.Title as="h4">Thread ???? x??a</Card.Title>
              </Card.Header>
              <Card.Body>
                <ReactTable
                  data={listDeletedThread}
                  columns={[
                    {
                      Header: "T???o b???i",
                      accessor: "createdBy",
                    },
                    {
                      Header: "Ti??u ?????",
                      accessor: "threadTitle",
                    },
                    {
                      Header: "Th??? lo???i",
                      accessor: "category",
                    },
                    {
                      Header: "Ph???n h???i",
                      accessor: "replies",
                    },
                    {
                      Header: "H??nh ?????ng",
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
                <Card.Title as="h4">B??o c??o ??ang ch???</Card.Title>
              </Card.Header>
              <Card.Body>
                <ReactTable
                  data={listReportPost}
                  columns={[
                    {
                      Header: "Ng?????i b??o c??o",
                      accessor: "reportBy",
                    },
                    {
                      Header: "Ti??u ?????",
                      accessor: "threadTitle",
                    },
                    {
                      Header: "N???i dung post",
                      accessor: "content",
                    },
                    {
                      Header: "L?? do",
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
};

export default ForumManage;
