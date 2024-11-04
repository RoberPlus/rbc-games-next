import React, { Suspense } from 'react';
import GridGames from '@/components/Home/GridGames';
import BasicLayout from '@/components/layouts/BasicLayout';

type Params = {
  platform: string;
};

interface PageProps {
  params: Promise<Params>;
}

const PlatformPage = async ({ params }: PageProps) => {
  const { platform } = await params;
  return (
    <BasicLayout>
      <div className="pt-52">
        <Suspense fallback={null}>
          <GridGames
            title={platform}
            platformSlug={platform}
            quantity={2}
            enablePagination={true}
          />
        </Suspense>
      </div>
    </BasicLayout>
  );
};

export default PlatformPage;
