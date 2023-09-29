import { GetServerSideProps } from "next";
import { fetchReservations } from "@/infrastructure/inner/services/fetchReservations";
import { getRoomsFromReservations } from "@/domain/services/getRoomsFromReservations";

export default function StudentsIndex() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const reservations = await fetchReservations();

  const rooms = getRoomsFromReservations(reservations);
  const [firstRoom] = rooms;

  return {
    redirect: {
      destination: `/rooms/${firstRoom.id}`,
      permanent: false,
    },
  };
};
