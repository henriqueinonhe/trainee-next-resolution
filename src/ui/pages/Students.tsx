import { Calendar } from "../components/Calendar";
import cx from "./Students.module.scss";
import { filterReservationsByStudent } from "@/domain/services/filterReservationsByStudent";
import { Reservation } from "@/domain/models/Reservation";
import { getStudentsFromReservations } from "@/domain/services/getStudentsFromReservations";
import { useRouter } from "next/router";
import { NavigationOverlay } from "../components/NavigationOverlay";
import { useIsNavigating } from "../hooks/useIsNavigating";

export type StudentsProps = {
  reservations: Array<Reservation>;
  selectedStudentId: number;
};

export const Students = ({
  selectedStudentId,
  reservations,
}: StudentsProps) => {
  const students = getStudentsFromReservations(reservations);
  const router = useRouter();
  const { isNavigating } = useIsNavigating();

  const handleStudentsDropdownChanged = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const nextRoomId = Number(event.target.value);
    router.push(`/students/${nextRoomId}`);
  };

  const selectedStudent = students.find(
    (courseTaker) => courseTaker.id === selectedStudentId,
  )!;
  const selectedStudentReservations = filterReservationsByStudent(
    reservations,
    selectedStudent,
  );

  const entries = selectedStudentReservations.map((reservation) => ({
    id: reservation.id.toString(),
    title: `${reservation.room.number} - ${reservation.room.name}`,
    dateStart: reservation.startDate,
    dateEnd: reservation.endDate,
    group: reservation.room.id.toString(),
  }));

  return (
    <div>
      {isNavigating && <NavigationOverlay />}

      <div className={cx.placeSelectContainer}>
        <select
          value={selectedStudentId}
          onChange={handleStudentsDropdownChanged}
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <div className={cx.calendarContainer}>
        <Calendar entries={entries} />
      </div>
    </div>
  );
};
