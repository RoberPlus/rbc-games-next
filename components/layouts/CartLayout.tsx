import Footer from "@/components/Footer/Footer";
import Header from "@/components/Cart/CartHeader";
import { Suspense } from "react";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col justify-between">
      <Suspense>
        <Header />
      </Suspense>
      <div className="w-full">
        <div className="container m-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default CartLayout;
