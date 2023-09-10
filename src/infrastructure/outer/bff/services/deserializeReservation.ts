import { Reservation } from "@/domain/models/Reservation";
import { SerializedReservation } from "../models/SerializedReservation";

export const deserializeReservation = (
  serializedReservation: SerializedReservation,
): Reservation => {
  return {
    ...serializedReservation,
    startDate: new Date(serializedReservation.startDate),
    endDate: new Date(serializedReservation.endDate),
  };
};
