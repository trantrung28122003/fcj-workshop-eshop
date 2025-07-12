import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../Admin/Dashboard/Dashboard.module.css";

const Code403: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
      <div
        className={styles.contentCard}
        style={{
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
          borderRadius: 32,
          boxShadow: "0 12px 48px rgba(6, 187, 204, 0.15)",
          padding: "56px 32px 48px 32px",
          background: "rgba(255,255,255,0.98)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h1 className={styles.contentTitle} style={{ fontSize: 100, margin: 0, letterSpacing: 4, background: "linear-gradient(45deg, #06bbcc, #4a90e2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>403</h1>
        <h2 className={styles.contentSubtitle} style={{ margin: "24px 0 32px", fontSize: 28, color: "#2d3748", fontWeight: 700 }}>
          Bạn không có quyền truy cập trang này.
        </h2>
        <button
          onClick={handleBackHome}
          style={{
            padding: "14px 48px",
            fontSize: 20,
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(90deg, #06bbcc, #4a90e2)",
            color: "white",
            cursor: "pointer",
            fontWeight: 700,
            boxShadow: "0 4px 16px rgba(6, 187, 204, 0.15)",
            marginTop: 8,
            letterSpacing: 1
          }}
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Code403;
