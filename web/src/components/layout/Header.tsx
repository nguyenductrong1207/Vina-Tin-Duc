import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { path: '/', label: 'Trang chủ' },
  { path: '/about', label: 'Giới thiệu' },
  { path: '/products', label: 'Sản phẩm' },
  { path: '/services', label: 'Dịch vụ' },
  { path: '/manufacturing-process', label: 'Quy trình' },
  { path: '/news', label: 'Tin tức' },
  { path: '/contact', label: 'Liên hệ' },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const headerClass = [
    styles.header,
    isScrolled ? styles.headerScrolled : '',
    isHomepage && !isScrolled ? styles.headerTransparent : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClass}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="VINA TIN DUC - Trang chủ">
          <span className={styles.logoText}>VINA TIN DUC</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                  end={item.path === '/'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/contact" className={styles.ctaBtn}>
          Liên hệ
        </Link>

        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen((p) => !p)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
        >
          <span className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`} />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className={styles.mobileNav}>
              <ul className={styles.mobileNavList}>
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                      }
                      onClick={() => setIsMenuOpen(false)}
                      end={item.path === '/'}
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
