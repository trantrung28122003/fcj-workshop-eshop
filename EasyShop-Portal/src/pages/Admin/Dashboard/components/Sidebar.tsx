import { NavLink } from "react-router-dom";
import styles from "../Dashboard.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div>
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
        </div>
        <div className={styles.logoutWrapper}>
          <button
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.href = "/login";
            }}
            className={styles.logoutBtn}
          >
            <i className="fas fa-sign-out-alt"></i>
            Đăng xuất
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
