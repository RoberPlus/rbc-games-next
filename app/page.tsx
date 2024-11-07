import BannerLastGame from '@/components/Home/BannerLastGame';
import GridGames from '@/components/Home/GridGames';
import TrustBar from '@/components/Home/TrustBar';
import BasicLayout from '@/components/layouts/BasicLayout';
import BannerAd from '../components/Home/BannerAd';
import image from '../public/images/img01.png';

export default function Home() {
  return (
    <>
      <BasicLayout>
        <div>
          <BannerLastGame />
          <div className="dark-bg absolute h-16 w-full triangle-clip -translate-y-16"></div>
          <GridGames title="Latest Games" quantity={6} enablePagination={false} />
          <TrustBar />
          <GridGames
            title="Playstation"
            quantity={3}
            platformSlug="playstation"
            enablePagination={false}
          />
          <BannerAd
            title="Join now and get better prices"
            subtitle="We have better prices than other platforms"
            btnTitle="Join now"
            btnLink="/account"
            image={image}
          />
          <div className="dark-bg absolute h-16 w-full triangle-clip -translate-y-16"></div>
          <GridGames title="Xbox" quantity={3} platformSlug="xbox" enablePagination={false} />
        </div>
      </BasicLayout>
    </>
  );
}
