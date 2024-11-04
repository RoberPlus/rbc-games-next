import GridGames from '@/components/Home/GridGames';
import BasicLayout from '@/components/layouts/BasicLayout';
import { Suspense } from 'react';

type SearchParams = {
  q?: string;
};

interface PageProps {
  searchParams: Promise<SearchParams>;
}

const SearchPage = async ({ searchParams }: PageProps) => {
  const { q } = await searchParams;

  return (
    <BasicLayout isOpenSearch>
      <div className="pt-52">
        <Suspense fallback={null}>
          <GridGames
            title="Search"
            enablePagination={true}
            quantity={2}
            query={q}
            isQueryMandatory
          />
        </Suspense>
      </div>
    </BasicLayout>
  );
};

export default SearchPage;
