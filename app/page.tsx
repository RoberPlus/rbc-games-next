import BannerLastGame from '@/components/Home/BannerLastGame';
import BasicLayout from '@/components/layouts/BasicLayout';

export default function Home() {
  return (
    <>
      <BasicLayout>
        <BannerLastGame />
        <div className="dark-bg absolute h-16 w-full triangle-clip -translate-y-16"></div>
      </BasicLayout>
    </>
  );
}
