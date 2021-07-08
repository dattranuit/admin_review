import Reat from "react";
import { Link } from "react-router-dom";
const LayoutReview = ({ item, index }) => {
  const removeReport = () => {
    Promise.all([axios.get(`${apiLocal}/api/reviews`)])
      .then(([listReview]) => {
        setData(listReview.data);
        setLoading(false);
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
            width: "10px",
            height: "24px",
            margin: " 0 20px",
          }}
        ></div>
        <p
          onClick={removeReport}
          style={{ cursor: "pointer", color: "#faa405" }}
        >
          Từ chối tố cáo
        </p>
      </div>
    </div>
  );
};
export default LayoutReview;
