import { Reservation } from "@/domain/models/Reservation";
import { Override } from "@/utils/types";

export type SerializedReservation = Override<
  Reservation,
  {
    startDate: string;
    endDate: string;
  }
>;
