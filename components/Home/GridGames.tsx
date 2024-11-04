'use client';

import { fetchGames } from '@/utils/actions';
import { Game } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import GameCardSkeleton from './GameCardSkeleton';
import { PaginationComponent } from '../Pagination/PaginationComponent';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import GameCard from './GameCard';
import { Title } from '@radix-ui/react-toast';

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
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = useSearchParams().get('page');

  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [currentQuery, setCurrentQuery] = useState(query || '');
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
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, currentQuery]);

  useEffect(() => {
    const queryParam = searchParams.get('q') || '';
    setCurrentQuery(queryParam);
  }, [searchParams]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    router.push(`${pathname}/?page=${page}`);
  };

  return (
    <div className="max-w-6xl pb-10 mb-10 m-auto">
      <h2 className="text-3xl capitalize pb-10">{title}{query && ': '+query}</h2>
      <div className="grid grid-cols-3 m-2 gap-3">
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
                {Object.entries(games).map(([gameIndex, gameData]) => {
                  return <GameCard game={gameData} key={gameData.id} />;
                })}
                {enablePagination && (
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default GridGames;
