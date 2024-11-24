import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const useCheckAuth = (EnableRedirect = false) => {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkCookie = async () => {
      const hasToken = getCookie("token");

      if (hasToken) {
        setIsLogged(true);
      }

      if (!hasToken && EnableRedirect) {
        router.replace("/");
      }
    };

    checkCookie();
  }, [router]);

  return isLogged;
};

export default useCheckAuth;
