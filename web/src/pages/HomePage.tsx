import { Helmet } from 'react-helmet-async';
import { useHomepage } from '@/features/home/hooks/useHomepage';
import { HeroSection } from '@/features/home/components/HeroSection';
import { IntroductionSection } from '@/features/home/components/IntroductionSection';
import { CapabilitiesSection } from '@/features/home/components/CapabilitiesSection';
import { StatisticsSection } from '@/features/home/components/StatisticsSection';
import { CtaSection } from '@/features/home/components/CtaSection';
import { LoadingPage } from '@/components/ui/LoadingPage';
import { ErrorState } from '@/components/ui/ErrorState';

export default function HomePage() {
  const { data: homepage, isLoading, error } = useHomepage();

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorState message="Không thể tải nội dung trang chủ." />;

  return (
    <>
      <Helmet>
        <title>{homepage?.seo?.metaTitle ?? 'VINA TIN DUC - Sản xuất nhựa & bao bì'}</title>
        <meta
          name="description"
          content={homepage?.seo?.metaDescription ?? 'VINA TIN DUC COMPANY LIMITED - Sản xuất nhựa, bao bì, gia công khuôn mẫu, bán buôn và tái chế.'}
        />
      </Helmet>

      {homepage?.hero && <HeroSection data={homepage.hero} />}
      {homepage?.introduction && <IntroductionSection data={homepage.introduction} />}
      {homepage?.capabilities && <CapabilitiesSection data={homepage.capabilities} />}
      {homepage?.statistics && <StatisticsSection data={homepage.statistics} />}
      {homepage?.ctaSection && <CtaSection data={homepage.ctaSection} />}
    </>
  );
}
