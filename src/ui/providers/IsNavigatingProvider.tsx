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
  delayedIsNavigating: boolean;
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
  const [delayedIsNavigating, setDelayedIsNavigating] = useState(false);
  const router = useRouter();

  const listenToNavigation = () => {
    let timeoutId!: NodeJS.Timeout;

    const navigationStarted = () => {
      setIsNavigating(true);
      timeoutId = setTimeout(() => {
        setDelayedIsNavigating(true);
      }, 300);
    };

    const navigationEnded = () => {
      setIsNavigating(false);
      setDelayedIsNavigating(false);
      clearTimeout(timeoutId);
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
      delayedIsNavigating,
    }),
    [delayedIsNavigating, isNavigating],
  );

  return (
    <IsNavigatingContext.Provider value={value}>
      {children}
    </IsNavigatingContext.Provider>
  );
};
