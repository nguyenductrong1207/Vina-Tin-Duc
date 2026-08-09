import { Outlet, useLocation } from 'react-router';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/ui/SkipLink';
import { useEffect } from 'react';

export function RootLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isHomepage = pathname === '/';

  return (
    <>
      <SkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        style={{ paddingTop: isHomepage ? 0 : 'var(--header-height)' }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
