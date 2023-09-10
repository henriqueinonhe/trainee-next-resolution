import { Calendar } from "../components/Calendar";
import cx from "./Rooms.module.scss";
import { Reservation } from "@/domain/models/Reservation";
import { getRoomsFromReservations } from "@/domain/services/getRoomsFromReservations";
import { filterReservationsByRoom } from "@/domain/services/filterReservationsByRoom";
import { useRouter } from "next/router";
import { NavigationOverlay } from "../components/NavigationOverlay";
import { useIsNavigating } from "../hooks/useIsNavigating";

export type RoomsProps = {
  reservations: Array<Reservation>;
  selectedRoomId: number | undefined;
};

export const Rooms = ({ reservations, selectedRoomId }: RoomsProps) => {
  const router = useRouter();
  const rooms = getRoomsFromReservations(reservations);
  const { isNavigating } = useIsNavigating();

  const handleRoomDropdownChanged = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const nextRoomId = Number(event.target.value);
    router.push(`/rooms/${nextRoomId}`);
  };

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId)!;
  const selectedRoomReservations = filterReservationsByRoom(
    reservations,
    selectedRoom,
  );

  const calendarEntries = selectedRoomReservations.map((reservation) => ({
    id: reservation.id.toString(),
    title: reservation.student.name,
    dateStart: reservation.startDate,
    dateEnd: reservation.endDate,
    group: reservation.id.toString(),
  }));

  return (
    <div>
      {isNavigating && <NavigationOverlay />}

      <div className={cx.placeSelectContainer}>
        <select value={selectedRoomId} onChange={handleRoomDropdownChanged}>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.number} - {room.name}
            </option>
          ))}
        </select>
      </div>

      <div className={cx.calendarContainer}>
        <Calendar entries={calendarEntries} />
      </div>
    </div>
  );
};
