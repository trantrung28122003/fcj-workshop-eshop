import { NavLink, useNavigate  } from "react-router-dom";
import styles from "./Navbar.module.css";
import { isUserLogin } from "../../hooks/useLogin";

const Navbar = () => {
  const isLoggedIn = isUserLogin();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className={`${styles.navbar} sticky-top`}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.brand}>
          <h2>
            <i className="fa fa-shopping-bag me-3"></i>FCJ EasyShop
          </h2>
        </NavLink>
        <ul className={`${styles.navLinks} d-none d-lg-flex`}>
          <li className={styles.navLink}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Trang Chủ
            </NavLink>
          </li>
          <li className={styles.navLink}>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Sản Phẩm
            </NavLink>
          </li>
          <li className={styles.navLink}>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Liên Hệ
            </NavLink>
          </li>
        </ul>

       {isLoggedIn ? (
          <button onClick={handleLogout} className={`${styles.ctaButton} d-none d-lg-block`}>
            Đăng Xuất
          </button>
        ) : (
          <NavLink to="/login" className={`${styles.ctaButton} d-none d-lg-block`}>
            Đăng Nhập
          </NavLink>
        )}

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileMenu"
          aria-controls="mobileMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className="collapse d-lg-none" id="mobileMenu">
        <ul className="navbar-nav text-center mt-3">
          <li>
            <NavLink to="/" className="nav-link">
              Trang Chủ
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className="nav-link">
              Sản Phẩm
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-link">
              Liên Hệ
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-link">
              Đăng Nhập
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
