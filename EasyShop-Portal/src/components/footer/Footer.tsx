import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h4>EasyShop</h4>
          <p>
            Nền tảng mua sắm trực tuyến hàng đầu, mang đến cho bạn những sản
            phẩm chất lượng với trải nghiệm tốt nhất.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h4>Liên kết</h4>
          <Link to="/">Trang Chủ</Link>
          <Link to="/products">Sản Phẩm</Link>
          <Link to="/contact">Liên Hệ</Link>
          <Link to="/login">Đăng Nhập</Link>
        </div>

        <div className={styles.footerSection}>
          <h4>Theo dõi chúng tôi</h4>
          <p>Kết nối với chúng tôi qua các mạng xã hội.</p>
          <div className={styles.socialIcons}>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>
          &copy; {new Date().getFullYear()} <Link to="/">EasyShop</Link>. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
