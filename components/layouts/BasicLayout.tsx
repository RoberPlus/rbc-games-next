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
      {/*TOP BAR */}
      <TopBar />
      <div className="container p-10 m-auto">
        {isContainer ? <div className="container m-auto">{children}</div> : children}
      </div>
      <Footer />
    </>
  );
};

export default BasicLayout;
