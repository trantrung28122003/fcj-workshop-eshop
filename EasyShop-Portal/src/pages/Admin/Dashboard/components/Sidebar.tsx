import { NavLink } from "react-router-dom";
import styles from "../Dashboard.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Categories
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
