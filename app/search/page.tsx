import GridGames from "@/components/Home/GridGames";
import BasicLayout from "@/components/layouts/BasicLayout";
import { Suspense } from "react";

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
          <div className="mb-40">
            <GridGames
              title="Search"
              enablePagination={true}
              quantity={6}
              query={q}
              isQueryMandatory
            />
          </div>
        </Suspense>
      </div>
    </BasicLayout>
  );
};

export default SearchPage;
