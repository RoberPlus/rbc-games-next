import GridGames from "@/components/Home/GridGames";
import BasicLayout from "@/components/Layouts/BasicLayout";
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
              quantity={2}
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
