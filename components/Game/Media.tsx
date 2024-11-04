import { Game } from '@/utils/types';
import React from 'react';
import ReactPlayer from 'react-player';
import Gallery from './Gallery';

type Props = {
  game: Game;
};

const Media = ({ game }: Props) => {
  return (
    <div className="relative mx-auto max-w-6xl pb-10 mb-10 m-auto">
      <Video video={game.video} />
      <Gallery pics={game.gallery} />
    </div>
  );
};

export default Media;

type VideoProps = {
  video: string;
};

const Video = ({ video }: VideoProps) => {
  return (
    <ReactPlayer
      url={video}
      width="100%"
      height={634}
      style={{
        overflow: 'hidden',
        borderRadius: '16px',
      }}
      volume={0.2}
    />
  );
};
