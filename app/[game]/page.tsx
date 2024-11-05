import BasicLayout from '@/components/layouts/BasicLayout';
import React, { Suspense } from 'react';
import GameDetails from '../../components/Game/GameDetails';

type Params = {
  game: string;
};

interface PageProps {
  params: Promise<Params>;
}

const GamePage = async ({ params }: PageProps) => {
  const { game } = await params;
  return (
    <BasicLayout>
      <div>
        <Suspense fallback={null}>
          <GameDetails gameSlug={game} />
        </Suspense>
      </div>
    </BasicLayout>
  );
};

export default GamePage;
