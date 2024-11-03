import BannerLastGame from '@/components/Home/BannerLastGame';
import LatestGames from '@/components/Home/LatestGames';
import TrustBar from '@/components/Home/TrustBar';
import BasicLayout from '@/components/layouts/BasicLayout';

export default function Home() {
  return (
    <>
      <BasicLayout>
        <BannerLastGame />
        <div className="dark-bg absolute h-16 w-full triangle-clip -translate-y-16"></div>
        <LatestGames />
        <TrustBar />
      </BasicLayout>
    </>
  );
}
