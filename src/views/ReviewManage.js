import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import { apiLocal } from "constant";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import SweetAlert from "react-bootstrap-sweetalert";
import LayoutReview from "../components/LayoutReview.js";
import Loading from "../components/Loading.js";

function ReviewManage() {
  const refSearch = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(0);
  useEffect(() => {
    Promise.all([axios.get(`${apiLocal}/api/reviews`)])
      .then(([listReview]) => {
        setData(listReview.data);
        setLoading(false);
      })
      .catch();
  }, [success]);
  const listReport = () => {
    let arr = [];
    data.filter((item) => {
      if (item.report.count > 0) return arr.push(item);
    });
    console.log(arr);
    setData(arr);
  };
  return loading ? (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "500px" }}
    >
      <Loading />
    </div>
  ) : (
    <>
      <h2 style={{ borderBottom: "3px solid #0062e0", color: "#014daf" }}>
        Danh sách các bài đánh giá
      </h2>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => listReport()}
          className="btn btn-warning"
          style={{ marginLeft: "40px" }}
        >
          Các bài đánh giá bị báo cáo
        </button>
      </div>
      <div>
        {[...data].reverse().map((item, index) => (
          <LayoutReview
            setSuccess={setSuccess}
            success={success}
            item={item}
            index={index}
          ></LayoutReview>
        ))}
      </div>
    </>
  );
}

export default ReviewManage;
