import { Game } from "@/utils/types";
import React from "react";

type Props = {
  game: Game;
};

const Info = ({ game }: Props) => {
  return (
    <>
      <div className="mx-auto mb-10 flex max-w-6xl flex-col space-y-10 pb-10 md:flex-row md:space-y-0">
        <div className="relative rounded-md p-5 md:w-1/2 md:p-0 md:pr-4">
          <p className="text-base text-slate-400">{game.summary}</p>
        </div>
        <div className="h-full p-5 md:w-1/2 md:p-0 md:pl-10">
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
                <span className="text-base capitalize text-white">
                  {game.platform.title}
                </span>
              </span>
            </li>
            <li>
              <span className="text-slate-400">
                Developer:
                <span className="text-base capitalize text-white">
                  CAPCOM Co., Ltd
                </span>
              </span>
            </li>
            <li>
              <span className="text-slate-400">
                Genre:
                <span className="text-base capitalize text-white">
                  Generic, Game
                </span>
              </span>
            </li>
            <li>
              <span className="text-slate-400">
                Recent Steam reviews:
                <span className="text-base capitalize text-blue-600">
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
