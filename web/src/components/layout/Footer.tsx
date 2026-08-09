import { Link } from 'react-router';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          {/* Company info */}
          <div className={styles.column}>
            <h3 className={styles.brand}>VINA TIN DUC</h3>
            <p className={styles.description}>
              CÔNG TY TNHH VINA TÍN ĐỨC
            </p>
            <address className={styles.address}>
              Số 6, Đường DX 013, Khu phố 6,
              <br />
              Phường Bình Dương,
              <br />
              Thành phố Hồ Chí Minh, Việt Nam
            </address>
          </div>

          {/* Quick links */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Liên kết</h4>
            <nav aria-label="Footer navigation">
              <ul className={styles.linkList}>
                <li><Link to="/about" className={styles.link}>Giới thiệu</Link></li>
                <li><Link to="/products" className={styles.link}>Sản phẩm</Link></li>
                <li><Link to="/services" className={styles.link}>Dịch vụ</Link></li>
                <li><Link to="/news" className={styles.link}>Tin tức</Link></li>
                <li><Link to="/contact" className={styles.link}>Liên hệ</Link></li>
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Dịch vụ</h4>
            <ul className={styles.linkList}>
              <li><Link to="/services" className={styles.link}>Sản xuất nhựa</Link></li>
              <li><Link to="/services" className={styles.link}>Bao bì nhựa</Link></li>
              <li><Link to="/services" className={styles.link}>Gia công khuôn mẫu</Link></li>
              <li><Link to="/services" className={styles.link}>Tái chế</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Liên hệ</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Link to="/contact" className={styles.link}>
                  Gửi yêu cầu tư vấn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} VINA TIN DUC COMPANY LIMITED. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
