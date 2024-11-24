"use client";

import { fetchGames } from "@/utils/actions";
import { Game } from "@/utils/types";
import React, { useEffect, useState } from "react";
import GameCardSkeleton from "@/components/Home/GameCardSkeleton";
import { PaginationComponent } from "@/components/Pagination/PaginationComponent";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import GameCard from "@/components/Home/GameCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type GridGamesType = {
  title?: string;
  platformSlug?: string;
  quantity?: number;
  enablePagination: boolean;
  query?: string;
  isQueryMandatory?: boolean;
};

const GridGames = ({
  title,
  platformSlug,
  quantity,
  enablePagination,
  query,
  isQueryMandatory,
}: GridGamesType) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isError, setIsError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = useSearchParams().get("page");

  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [currentQuery, setCurrentQuery] = useState(query || "");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (isQueryMandatory && !currentQuery.trim()) {
        setGames([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const fetchedGames = (await fetchGames({
          quantity,
          platformSlug,
          currentPage: currentPage,
          query: currentQuery,
        })) as any;
        setGames(fetchedGames.data);
        setTotalPages(fetchedGames.meta.pagination.pageCount);
      } catch (error) {
        setIsError(error);
        console.log(isError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, currentQuery]);

  useEffect(() => {
    const queryParam = searchParams.get("q") || "";
    setCurrentQuery(queryParam);
  }, [searchParams]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    router.push(`${pathname}/?page=${page}`);
  };

  return (
    <div className="mb-20 max-w-screen-sm p-5 md:mx-auto md:max-w-6xl">
      <div className="my-10 flex items-center justify-start space-x-2">
        <Link href={platformSlug ? "/games/" + platformSlug : ""}>
          <div className="flex items-center justify-start space-x-2">
            <h2 className="text-3xl capitalize">
              {title}
              {query && ": " + query}
            </h2>
            {platformSlug && <ChevronRight size={30} />}
          </div>
        </Link>
      </div>

      <div className="flex w-full flex-1 snap-x space-x-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-3 md:space-x-0">
        {isLoading ? (
          <>
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
          </>
        ) : (
          <>
            {Object.keys(games).length === 0 ? (
              <p>No games available.</p>
            ) : (
              <>
                {Object.entries(games).map(([, gameData]) => {
                  return <GameCard game={gameData} key={gameData.id} />;
                })}
              </>
            )}
          </>
        )}
      </div>

      {enablePagination && Object.keys(games).length > 0 ? (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : null}
    </div>
  );
};

export default GridGames;
