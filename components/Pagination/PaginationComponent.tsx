import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
                  ? "pointer-events-none cursor-not-allowed hover:bg-transparent"
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
                    ? "pointer-events-none cursor-not-allowed hover:bg-transparent"
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
                  ? "pointer-events-none cursor-not-allowed hover:bg-transparent"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
