import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { apiLocal } from "constant";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import * as loadingIcon from "react-loading-icons";
import $ from "jquery";
const LayoutReview = ({ item, index, setSuccess, success }) => {
  const removeReport = (id) => {
    $(`#review-${id}`).removeClass("hidden");
    Promise.all([axios.post(`${apiLocal}/api/reviews/${id}/decline-report`)])
      .then(() => {
        setSuccess(success + 1);
        $(`review-${id}`).addClass("hidden");
      })
      .catch();
  };
  return (
    <div
      key={index}
      style={{
        borderTop: "1px solid #e2e7eb",
        borderBottom: "1px solid #e2e7eb",
        margin: "20px 0",
        padding: "20px 0",
      }}
    >
      <div style={{ display: "flex" }}>
        <p style={{ flex: 1 }}>{item.idSchool.name}</p>
        <p style={{ flex: 1 }}>Mã trường : {item.idSchool.code}</p>
      </div>
      <div style={{ display: "flex" }}>
        <p style={{ flex: 2 }}>
          Người dùng : {item.idUser ? item.idUser.name : "ẩn danh"}
        </p>
        <p style={{ flex: 1 }}>
          Lượt vote : {item.rateValue.up.count - item.rateValue.down.count || 0}
        </p>
        <p style={{ flex: 1 }}>Số bình luận : {item.comments || 0}</p>
        <p style={{ flex: 1 }}>Số lượt tố cáo : {item.report.count || 0}</p>
      </div>
      <div style={{ display: "flex" }}>
        <a
          target="_blank"
          href={`http://localhost:1000/reviews/${item._id}/detail`}
        >
          Đi tới bài đánh giá
        </a>
        <div
          style={{
            background: "#b0b3b8",
            width: "1px",
            height: "24px",
            margin: " 0 20px",
          }}
        ></div>
        <div style={{ display: "flex" }}>
          <p
            onClick={() => removeReport(item._id)}
            style={{ cursor: "pointer", color: "#faa405", marginRight: "6px" }}
          >
            Từ chối tố cáo
          </p>
          <div id={`review-${item._id}`} className="hidden">
            <loadingIcon.ThreeDots
              fill="#faa405"
              width="24"
              height="24"
            ></loadingIcon.ThreeDots>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LayoutReview;
