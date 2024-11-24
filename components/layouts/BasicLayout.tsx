"use client";
import Footer from "@/components/Footer/Footer";
import TopBar from "@/components/TopBar/TopBar";

type BasicLayoutTypes = {
  children: React.ReactNode;
  isOpenSearch?: boolean;
  isContainer?: boolean;
  relative?: boolean;
};

const BasicLayout = ({
  children,
  isOpenSearch = false,
  isContainer = false,
}: BasicLayoutTypes) => {
  return (
    <div className="flex h-full flex-col justify-between">
      <TopBar isOpenSearch={isOpenSearch} />
      <div className="w-full">
        {isContainer ? (
          <div className="container m-auto">{children}</div>
        ) : (
          children
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BasicLayout;
