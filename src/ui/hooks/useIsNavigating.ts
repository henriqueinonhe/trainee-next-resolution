import { useContext } from "react";
import { IsNavigatingContext } from "../providers/IsNavigatingProvider";

export const useIsNavigating = () => {
  const value = useContext(IsNavigatingContext);

  if (value === undefined) {
    throw new Error(
      "useIsNavigating must be used within a IsNavigatingProvider",
    );
  }

  return value;
};
