import { Game } from "@/utils/types";
import React from "react";
import ReactPlayer from "react-player";
import Gallery from "./Gallery";

type Props = {
  game: Game;
};

const Media = ({ game }: Props) => {
  return (
    <div className="relative m-auto mx-auto mb-10 max-w-6xl pb-10">
      <Video video={game.video} />
      <Gallery pics={game.gallery as any} />
    </div>
  );
};

export default Media;

type VideoProps = {
  video: string;
};

const Video = ({ video }: VideoProps) => {
  return (
    <div className="h-[300px] md:h-[600px]">
      <ReactPlayer
        url={video}
        width="100%"
        height="100%"
        style={{
          overflow: "hidden",
          borderRadius: "16px",
        }}
        volume={0.2}
      />
    </div>
  );
};
