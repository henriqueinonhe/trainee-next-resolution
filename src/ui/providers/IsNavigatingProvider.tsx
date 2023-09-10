import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type IsNavigatingContextValue = {
  isNavigating: boolean;
};

export const IsNavigatingContext = createContext<
  IsNavigatingContextValue | undefined
>(undefined);

export type IsNavigatingProviderProps = {
  children: ReactNode;
};

export const IsNavigatingProvider = ({
  children,
}: IsNavigatingProviderProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const listenToNavigation = () => {
    const navigationStarted = () => {
      setIsNavigating(true);
    };

    const navigationEnded = () => {
      setIsNavigating(false);
    };

    router.events.on("routeChangeStart", navigationStarted);
    router.events.on("routeChangeComplete", navigationEnded);
    router.events.on("routeChangeError", navigationEnded);

    return () => {
      router.events.off("routeChangeStart", navigationStarted);
      router.events.off("routeChangeComplete", navigationEnded);
      router.events.off("routeChangeError", navigationEnded);
    };
  };
  const listenToNavigationRef = useRef(listenToNavigation);
  listenToNavigationRef.current = listenToNavigation;

  useEffect(() => {
    listenToNavigationRef.current();
  }, []);

  const value = useMemo(
    () => ({
      isNavigating,
    }),
    [isNavigating],
  );

  return (
    <IsNavigatingContext.Provider value={value}>
      {children}
    </IsNavigatingContext.Provider>
  );
};
