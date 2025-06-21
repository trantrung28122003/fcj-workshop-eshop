import { NavLink } from "react-router-dom";
import styles from "./Dashboard.module.css";
import React from "react";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoIcon}>FCJ</div>
          <div className={styles.logoText}>AWS FCJ</div>
        </div>
        <div className={styles.sidebarTitle}>FISRT CLOUD JOURNEY</div>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <span className={styles.navIcon}>📦</span>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <span className={styles.navIcon}>🏷️</span>
              Categories
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

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
