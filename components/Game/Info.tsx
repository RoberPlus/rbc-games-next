import { Game } from "@/utils/types";
import React from "react";

type Props = {
  game: Game;
};

const Info = ({ game }: Props) => {
  return (
    <>
      <div className="relative flex mx-auto max-w-6xl pb-10 mb-10 m-auto">
        <div className="w-1/2 pr-4 rounded-md relative">
          <p className="text-base text-slate-400">{game.summary}</p>
        </div>
        <div className="w-1/2 pl-10 h-full">
          <ul>
            <li>
              <span className="text-slate-400">
                Release date:
                <span className="text-base text-white">{game.releaseDate}</span>
              </span>
            </li>
            <li>
              <span className="text-slate-400">
                Platform:
                <span className="text-base text-white capitalize">
                  {game.platform.title}
                </span>
              </span>
            </li>
            <li>
              <span className="text-slate-400">
                Developer:
                <span className="text-base text-white capitalize">
                  CAPCOM Co., Ltd
                </span>
              </span>
            </li>
            <li>
              <span className="text-slate-400">
                Genre:
                <span className="text-base text-white capitalize">
                  Generic, Game
                </span>
              </span>
            </li>
            <li>
              <span className="text-slate-400">
                Recent Steam reviews:
                <span className="text-base text-blue-600 capitalize">
                  Overwhelmingly positive
                </span>
                (1245)
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Info;
