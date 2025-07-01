import styles from "./Dashboard.module.css";
import React from "react";
import Sidebar from "./components/Sidebar";



interface AdminDashboardProps {
  children: React.ReactNode;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ children }) => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h1 className={styles.contentTitle}>Admin Dashboard Easy Shop</h1>
          <p className={styles.contentSubtitle}>Quản lý sản phẩm và danh mục</p>
        </div>
        <div className={styles.contentCard}>
          {children ? (
            children
          ) : (
            <div className={styles.welcomeMessage}>
              <p>👋 Chào mừng bạn đến trang quản trị Admin</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
