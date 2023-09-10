import { Reservation } from "@/domain/models/Reservation";
import { SerializedReservation } from "../models/SerializedReservation";

export const serializeReservation = (
  reservation: Reservation,
): SerializedReservation => {
  return {
    ...reservation,
    startDate: reservation.startDate.toISOString(),
    endDate: reservation.endDate.toISOString(),
  };
};
