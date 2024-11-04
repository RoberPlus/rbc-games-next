'use client';
import Footer from '../Footer/Footer';
import TopBar from '../TopBar/TopBar';

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
  relative = false,
}: BasicLayoutTypes) => {
  return (
    <>
      <TopBar isOpenSearch={isOpenSearch} />
      <div className="w-full">
        {isContainer ? <div className="container m-auto">{children}</div> : children}
      </div>
      <Footer />
    </>
  );
};

export default BasicLayout;
