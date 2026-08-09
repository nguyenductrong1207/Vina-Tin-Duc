import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { RootLayout } from '@/layouts/RootLayout';
import { LoadingPage } from '@/components/ui/LoadingPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Lazy-loaded page components for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'));
const ManufacturingProcessPage = lazy(() => import('@/pages/ManufacturingProcessPage'));
const NewsPage = lazy(() => import('@/pages/NewsPage'));
const NewsDetailPage = lazy(() => import('@/pages/NewsDetailPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'about',
        element: (
          <SuspenseWrapper>
            <AboutPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'products',
        element: (
          <SuspenseWrapper>
            <ProductsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'products/:slug',
        element: (
          <SuspenseWrapper>
            <ProductDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'services',
        element: (
          <SuspenseWrapper>
            <ServicesPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'services/:slug',
        element: (
          <SuspenseWrapper>
            <ServiceDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'manufacturing-process',
        element: (
          <SuspenseWrapper>
            <ManufacturingProcessPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'news',
        element: (
          <SuspenseWrapper>
            <NewsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'news/:slug',
        element: (
          <SuspenseWrapper>
            <NewsDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'contact',
        element: (
          <SuspenseWrapper>
            <ContactPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
