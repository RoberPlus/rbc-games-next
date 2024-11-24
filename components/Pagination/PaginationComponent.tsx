import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type PaginationProps = {
  currentPage: any;
  totalPages: any;
  onPageChange: any;
};

export const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <Pagination className="mt-16">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => {
                if (currentPage >= totalPages) {
                  return null;
                } else {
                  onPageChange(currentPage <= 1);
                }
              }}
              className={
                currentPage <= 1
                  ? "cursor-not-allowed hover:bg-transparent pointer-events-none"
                  : undefined
              }
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem key={page} onClick={() => onPageChange(page)}>
              <PaginationLink
                href="#"
                isActive={page === currentPage && true}
                className={
                  page === currentPage
                    ? "cursor-not-allowed hover:bg-transparent pointer-events-none"
                    : undefined
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => {
                if (currentPage >= totalPages) {
                  return null;
                } else {
                  onPageChange(currentPage + 1);
                }
              }}
              className={
                currentPage >= totalPages
                  ? "cursor-not-allowed hover:bg-transparent pointer-events-none"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
