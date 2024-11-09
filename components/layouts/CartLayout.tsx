import Footer from '../Footer/Footer';
import Header from '../Cart/Header';
import { Suspense } from 'react';

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <div className="w-full">
        <div className="container m-auto">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default CartLayout;
