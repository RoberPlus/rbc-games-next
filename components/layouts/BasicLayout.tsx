'use client';
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
      <div className="container p-10">
        {isContainer ? <div className="container">{children}</div> : children}
      </div>
      {/*FOOTER */}
    </>
  );
};

export default BasicLayout;
